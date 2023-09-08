const { requestModel } = require("../Model/requestModal");

const getMyRequest = async (query) => {
    try {
        const request = await requestModel.find(query).lean().populate('senderID', 'name email mobileNo');
        return request;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { getMyRequest }