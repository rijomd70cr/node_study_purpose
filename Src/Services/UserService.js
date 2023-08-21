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
  }
};
