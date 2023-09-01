const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = Schema(
    {
        status: { type: String },  // Requested ,Rejected , Accepted ,Cancelled
        senderID: { type: Schema.Types.ObjectId, ref: 'User' },
        recieverID: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);
module.exports = {
    requestSchema,
    requestModel: mongoose.model("Request", requestSchema)
}
