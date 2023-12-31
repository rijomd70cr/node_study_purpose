const UserService = require("../../Services/UserService");
const MiscService = require("../../Services/MiscServices");


module.exports = {

  doSignup: async (req, res, next) => {
    let user = req.body;
    try {
      let exist = await UserService.getUser(user.email);
      exist
        ? res.status(400).json(MiscService.response(400, process.env.ALREADY_EXIST, {}))
        : ((user.password = await MiscService.encryptPassword(user.password)),
          (user = await UserService.createUser(user)),
          (token = await MiscService.generateToken(user._id)),
          res
            .status(201)
            .json(MiscService.response(200, process.env.SUCCESS, { token, user: { email: user.email } })));
    } catch (error) {
      console.log(error)
      res.status(400).json(MiscService.response(400, error.error || process.env.WRONG_SOMETHING, {}));
    }
  },

  doLogin: async (req, res) => {
    let user = req.body;
    try {
      let User = await UserService.getUser(user.email);
      if (User) {
        (passwordVerification = await MiscService.verifyPassword(user.password, User.password)),
          (token = MiscService.generateToken(User._id)),
          (selectedItemUser = await MiscService.generateUser(User)),
          res.status(200).json(MiscService.response(200, process.env.SUCCESS, { token, selectedItemUser }))
      }
      else {
        res.status(400).json(MiscService.response(400, process.env.NO_USER_FOUND, {}));
      }
    } catch (error) {
      console.log(error)
      res.status(400).json(MiscService.response(400, error.error || process.env.WRONG_SOMETHING, {}));
    }
  },

};