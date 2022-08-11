const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true },
  {
    auth: {
      authSource: "admin",
    },
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PW,
  }
);

const db = mongoose.connection;

module.exports = db;
