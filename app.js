const express = require("express");
const { default: mongoose } = require("mongoose");
const userSchema = require("./schemas/User");
require("dotenv").config();
const db = require("./utils/db");

// app settings
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
