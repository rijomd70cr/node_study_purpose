const MiscService = require("../Services/MiscServices");
const crudOperations = require("../General/CrudOperations");

const insertUser = async (req, res) => {
    let user = req.body;
    try {
        let User = await crudOperations.create("User", user);
        res.status(200).json(MiscService.response(200, process.env.SUCCESS, User));
    } catch (error) {
        console.log(error)
        res.status(400).json(MiscService.response(400, process.env.WRONG_SOMETHING, {}));
    }
}


module.exports = {
    insertUser
}