const MiscService = require("../../Services/MiscServices");
const { getMyRequest } = require("../../Services/RequestService");

const { create, update, getSingleData, list } = require("../../General/CrudOperations");

const modelName = "Request";

const requestFriend = async (req, res) => {
    let query = req.body.data;
    let user = req.user;
    let response;
    let recieverID;
    let senderID;
    if (query.recieverID) {
        recieverID = query.recieverID;
        senderID = user._id;
    }
    if (query.senderID) {
        senderID = query.senderID;
        recieverID = user._id;
    }
    try {
        if (query.isModify) {
            response = await update(modelName, query, { recieverID: recieverID, senderID: senderID, });
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

const myRequests = async (req, res) => {
    try {
        const query = { recieverID: req.user._id, status: "Requested" }
        const response = await getMyRequest(query);
        res.status(200).json(MiscService.response(200, process.env.SUCCESS, { requestList: response }));
    } catch (error) {
        console.log(error)
        res.status(400).json(MiscService.response(400, error.message || process.env.WRONG_SOMETHING, {}));
    }
}



module.exports = { requestFriend, myRequests }