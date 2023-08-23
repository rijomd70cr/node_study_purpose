const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNo: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);
module.exports = {
  userSchema,
  UserModel: mongoose.model("User", userSchema)
}
