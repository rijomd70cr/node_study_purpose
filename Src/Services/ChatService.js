const { ChatModel } = require("../Model/chatModel");
const { MessageModel } = require("../Model/messageModel");
const { dbNamesSchema } = require("../Model/dbNames");

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
            const data = await MessageModel.find({ chat: query }).limit(200).populate("sender", "name");
            if (data) { return data; }
        }
    } catch (error) {
        throw new Error(error);
    }
};

const createDbNames = async (query) => {
    try {
        const NewModel = await query.myDataBase?.model(query.modelDbNames, dbNamesSchema);
        const dbNameDetails = await new NewModel(query.fields);
        const data = await dbNameDetails.save();
        if (data) { return data; }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}


module.exports = { findOutExistingChat, findOutMessages, createDbNames }
