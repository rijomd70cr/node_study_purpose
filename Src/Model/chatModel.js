const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = Schema(
  {
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    chatName: { type: String },
    isGroupChat: { type: Boolean },
    usersName: [{ type: String }]
  },
  {
    timestamps: true,
  }
);
module.exports = {
  chatSchema,
  ChatModel: mongoose.model("Chat", chatSchema)
}
