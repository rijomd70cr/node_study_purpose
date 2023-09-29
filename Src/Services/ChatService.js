const { ChatModel } = require("../Model/chatModel");

const findOutExistingChat = async (query) => {
    try {
        // check by chat name
        if (query?.isGroupChat) { }
        else {
            const data = ChatModel.find({ users: { $all: query.users } });
            if (data) { return data; }
        }
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = { findOutExistingChat }
