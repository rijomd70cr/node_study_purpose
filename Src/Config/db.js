const mongoose = require("mongoose");

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL_MULTI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

const connectMultiDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL_MULTI, mongoOptions);
    if (connection) {
      console.log('Multi MongoDB connected');
      return connection;
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

module.exports = {
  connectDB, connectMultiDB
};
