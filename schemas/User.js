const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: String,
  password: { type: String, required: true },
  items: [],
  charity: { type: String, default: null },
});

module.exports = mongoose.model("users", userSchema);
