const MiscService = require("../../Services/MiscServices");
const { findOutExistingChat, findOutMessages } = require("../../Services/ChatService");
const { create } = require("../../General/CrudOperations");

const modelName = "Chat";

const myChat = async (req, res) => {
    try {
        let roomId = "";
        let myMessages = [];
        const query = {
            users: [req.user?.id, req.body?.sender?._id],
            isGroupChat: req.body?.isGroupChat,
            chatName: req.body?.chatName || "",
        };
        const existedData = await findOutExistingChat(query);
        if (existedData?.length > 0) {
            roomId = existedData?.[0]?._id;
            myMessages = await findOutMessages(roomId);
        }
        else {
            query['usersName'] = [req.user?.name, req.body?.sender?.name];
            const response = await create(modelName, query);
            roomId = response?._id;
        }
        res.status(200).json(MiscService.response(200, process.env.SUCCESS, { roomId: roomId, messages: myMessages }));
    } catch (error) {
        console.log(error);
        res.status(400).json(MiscService.response(400, error.message || process.env.WRONG_SOMETHING, {}));
    }
}

module.exports = { myChat }
