const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModal = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNo: { type: String, required: false },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);
module.exports = User = mongoose.model("User", userModal);
