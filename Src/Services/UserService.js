const { UserModel } = require("../Model/userModel");

const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

module.exports = {

  getUser: (email) => {
    try {
      let data = UserModel.findOne({ email });
      if (!data) {
        throw error;
      }
      return data
    } catch (error) {
      throw error;
    }
  },

  createUser: (user) => {
    return UserModel.create(user);
  },

  getUserByid: (id) => {
    return UserModel.findById(id).select("-password")
  },

  getUserList: async (query) => {
    const fields = { email: 1, name: 1, mobileNo: 1, _id: 1, requestStatus: { $arrayElemAt: ['$requestlist.status', 0] } }
    try {
      let user = await UserModel.aggregate([
        {
          $lookup: {
            from: 'requests',
            localField: '_id',
            foreignField: 'recieverID',
            as: 'requestlist'
          }
        },
        { $match: query },
        { $project: fields }
      ]);
      return user;
    } catch (error) {
      console.log(error);
    }

  }
}
