const { ChatModel } = require("../Model/chatModel");
const { MessageModel } = require("../Model/messageModel");


const findOutExistingChat = async (query) => {
    try {
        if (query?.isGroupChat) { }
        else {
            const data = await ChatModel.find({ users: { $all: query.users } });
            if (data) { return data; }
        }
    } catch (error) {
        throw new Error(error);
    }
};

const findOutMessages = async (query) => {
    try {
        if (query?.isGroupChat) { }
        else {
            const data = await MessageModel.find({ chat: query });
            if (data) { return data; }
        }
    } catch (error) {
        throw new Error(error);
    }
};


module.exports = { findOutExistingChat, findOutMessages }
