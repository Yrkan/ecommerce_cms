const mongoose = require("mongoose");
const config = require("config");

const connectDatabase = async () => {
  try {
    const databaseURL = config.get("databaseURL");
    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    await mongoose.connect(databaseURL, options);
    console.log("Database connected successfully");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
