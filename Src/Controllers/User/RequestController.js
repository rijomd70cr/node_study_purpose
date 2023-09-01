const MiscService = require("../../Services/MiscServices");
const { create, update, getSingleData } = require("../../General/CrudOperations");

const modelName = "Request";

const requestFriend = async (req, res) => {
    let query = req.body.data;
    let user = req.user;
    let response;
    try {
        if (query.isModify) {
            response = await update(modelName, query, { recieverID: query.recieverID, senderID: user._id, });
        }
        else {
            query.status = "Requested";
            query.senderID = user._id;
            // check the item already exist
            const requestItem = await getSingleData(modelName, { senderID: user._id, recieverID: query.recieverID });
            if (requestItem) {
                response = await update(modelName, query, { _id: requestItem._id });
            }
            else {
                response = await create(modelName, query);
            }
        }
        res.status(200).json(MiscService.response(200, process.env.SUCCESS, { _id: response?._id || "" }));
    } catch (error) {
        console.log(error)
        res.status(400).json(MiscService.response(400, error.message || process.env.WRONG_SOMETHING, {}));
    }
}

module.exports = { requestFriend }