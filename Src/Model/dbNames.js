const mongoose = require("mongoose");
const { Schema } = mongoose;

const dbNamesSchema = Schema(
  {
    dbName: { type: String },
    connectionURL: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = {
  dbNamesSchema,
  dbNamesModel: mongoose.model("dbNames", dbNamesSchema)
}
