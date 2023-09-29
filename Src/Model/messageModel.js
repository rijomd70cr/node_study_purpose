const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = Schema(
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
  messageSchema,
  MessageModel: mongoose.model("Message", messageSchema)
}
