const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new mongoose.Schema(
  {
    message: { text: { type: String, required: true } },
    users: Array,
    sender: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("messages", messageSchema);

//{"message": "hello", "from": "62f61d8a5236e2a49faffe9e", "to": "6194da0514543710b7c86"}
