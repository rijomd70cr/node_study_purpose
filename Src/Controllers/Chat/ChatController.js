const MiscService = require("../../Services/MiscServices");
const { findOutExistingChat, findOutMessages, createDbNames } = require("../../Services/ChatService");
const { create } = require("../../General/CrudOperations");

const modelName = "Chat";
const modelMessage = "Message";
const modelDbNames = "dbNames";


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
            const latestMessages = await findOutMessages(roomId);
            myMessages = modifyMessage(latestMessages);
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

const addMessage = async (data) => {
    try {
        const response = await create(modelMessage, data);
        if (response) {
            const myMessages = await findOutMessages(data.chat);
            const latestMessages = modifyMessage(myMessages);
            return latestMessages;
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const modifyMessage = (myMessages) => {
    const latestMessages = myMessages.map(item => {
        return {
            sender: item.sender?.name,
            senderID: item.sender?._id?.toString(),
            chat: item.chat,
            updatedAt: item.updatedAt,
            messageContent: item.messageContent,
            _id: item._id
        }
    });
    return latestMessages;
}

const changeDB = async (req, res) => {
    let query = { fields: req.body, modelDbNames: modelDbNames, myDataBase: req.user?.myDataBase };
    try {
        await createDbNames(query);
        res.status(200).json(MiscService.response(200, process.env.SUCCESS, {}));
    } catch (error) {
        res.status(400).json(MiscService.response(400, process.env.WRONG_SOMETHING, {}));
    }
}

module.exports = { myChat, addMessage, changeDB }
