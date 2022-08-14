const userSchema = require("./schemas/User");
const itemSchema = require("./schemas/Item");
const imageSchema = require("./schemas/image");
const { default: mongoose } = require("mongoose");
const multer = require("multer");
const upload = require("./utils/upload");

// User Routes

exports.getAllUsers = async (req, res) => {
  const allUsers = await userSchema.find();
  res.status(200).send(allUsers);
};

exports.getUserId = async (req, res) => {
  const singleUser = await userSchema.findById(req.params.userId);
  res.status(200).send(singleUser);
};

// exports.patchUser = (req, res) => {
//   const updateUserBody = req.body;
//   const id = req.params.userId;

//   userSchema.findByIdAndUpdate(
//     id,
//     { updateUserBody },
//     { new: true },
//     (err, user) => {
//       if (err) res.status(500);
//       if (!user) res.status(404).send("404: User not found.");
//       else res.status(200).send(user);
//     }
//   );
// };

exports.patchUser = async (req, res) => {
  const updateUserBody = req.body;
  const updateUser = await userSchema.updateOne({ _id: req.params.userId }, { $set: updateUserBody });
  res.status(200).send(updateUser);
};

// Item Routes

exports.getSingleItem = async (req, res) => {
  const singleItem = await itemSchema.findById(req.params.itemId).populate("items");
  res.status(200).send(singleItem);
};

exports.getAllItems = async (req, res) => {
  const allItems = await itemSchema.find();
  res.status(200).send(allItems);
};

exports.postItem = async (req, res) => {
  const userId = req.params.userId;
  const item = new itemSchema({
    itemname: req.body.itemname,
    itemlocation: req.body.itemlocation,
    itemcategory: req.body.itemcategory,
    itemowner: req.body.itemowner,
    itemimgurl: req.file.link,
  });
  await item.save().then((result) => {
    userSchema.findByIdAndUpdate(userId, { $push: { items: item } }, { new: true, useFindAndModify: false });
    res.status(201).send(result);
  });
};

exports.patchItem = async (req, res) => {
  const updateItemBody = req.body;
  const updateItem = await itemSchema.updateOne({ _id: req.params.itemId }, { $set: updateItemBody });
  res.status(200).send(updateItem);
};

exports.deleteItem = async (req, res) => {
  const removeItem = await itemSchema.remove({ _id: req.params.itemId });
  res.status(204).send(removeItem);
};
