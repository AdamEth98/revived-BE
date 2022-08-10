const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://ncendproject.bfw0nse.mongodb.net/revive",
  { useNewUrlParser: true },
  {
    // auth: {
    //   authSource: "admin",
    // },
    user: admin,
    pass: h6wxQmSdreeX2r71,
  }
);

const db = mongoose.connection;

module.exports = db;
