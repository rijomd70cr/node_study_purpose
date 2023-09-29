const MiscService = require("../../Services/MiscServices");
const { findOutExistingChat } = require("../../Services/ChatService");
const { create } = require("../../General/CrudOperations");

const modelName = "Chat";

const myChat = async (req, res) => {
    try {
        let roomId = "";
        const query = {
            users: [req.user?.id, req.body?.sender],
            isGroupChat: req.body?.isGroupChat,
            chatName: req.body?.chatName || ""
        };
        const existeddata = await findOutExistingChat(query);
        if (existeddata?.length > 0) {
            roomId = existeddata?._id
        }
        else {
            const response = await create(modelName, query);
            roomId = response?._id;
        }
        res.status(200).json(MiscService.response(200, process.env.SUCCESS, { roomId: roomId }));
    } catch (error) {
        console.log(error)
        res.status(400).json(MiscService.response(400, error.message || process.env.WRONG_SOMETHING, {}));
    }
}

module.exports = { myChat }
