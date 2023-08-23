const mongoose = require("mongoose");

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // poolSize: 10
}

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL_MULTI, mongoOptions);
    if (connection) {
      console.log("Production - MongoDB Connected");
      return connection;
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

const connectMultiDB = async (newDatabaseName) => {
  try {
    if (mongoose.connection) {
      mongoose.connection.db = await mongoose.connection.client.db(newDatabaseName);
      console.log(`${newDatabaseName} - MongoDB Connected"`);
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

module.exports = {
  connectDB, connectMultiDB
};
