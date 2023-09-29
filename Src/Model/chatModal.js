const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = Schema(
  {
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    chatName: { type: String },
    isGroupChat: { type: Boolean },
  },
  {
    timestamps: true,
  }
);
module.exports = {
  chatSchema,
  ChatModel: mongoose.model("Chat", chatSchema)
}
