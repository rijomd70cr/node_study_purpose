const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    messageContent: { type: String },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
  },
  { timestamps: true }
);

module.exports = {
  messageSchema,
  MessageModel: mongoose.model("Message", messageSchema)
}
