const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: String,
  password: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "items" }],
  charity: { type: String, default: "" },
  avatar: { type: String, default: "" },
  favouriteItems: [{ type: Schema.Types.ObjectId, ref: "items" }],
});

module.exports = mongoose.model("users", userSchema);
