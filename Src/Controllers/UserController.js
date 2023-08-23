const MiscService = require("../Services/MiscServices");
const { create, list, update } = require("../General/CrudOperations");

const modelName = "User";

const insertUser = async (req, res) => {
    let user = req.body;
    let response;
    try {
        if (user._id) {
            response = await update(modelName, user, { email: user.email });
        }
        else {
            user.password = await MiscService.encryptPassword(user.password)
            response = await create(modelName, user);
        }

        res.status(200).json(MiscService.response(200, process.env.SUCCESS, { _id: response?._id || "" }));
    } catch (error) {
        console.log(error)
        res.status(400).json(MiscService.response(400, error.message || process.env.WRONG_SOMETHING, {}));
    }
}


const friendList = async (req, res) => {
    let user = req.body || {};
    try {
        let friendList = await list(modelName, user);
        res.status(200).json(MiscService.response(200, process.env.SUCCESS, { friendList: friendList }));
    } catch (error) {
        console.log(error)
        res.status(400).json(MiscService.response(400, error?.message || process.env.WRONG_SOMETHING, {}));
    }
}

module.exports = {
    insertUser, friendList
}