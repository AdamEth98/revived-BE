const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://ncendproject.bfw0nse.mongodb.net/revive",
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
