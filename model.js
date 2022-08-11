const userSchema = require("./schemas/User");
const itemSchema = require("./schemas/Item");

// User Routes

exports.getAllUsers = async (req, res) => {
  const allUsers = await userSchema.find();
  res.status(200).send(allUsers);
};

exports.getUserId = async (req, res) => {
  const singleUser = await userSchema.findById(req.params.userId);
  res.status(200).send(singleUser);
};

exports.patchUser = async (req, res) => {
  const updateUserBody = req.body;
  const updateUser = await itemSchema.updateOne(
    { _id: req.params.itemId },
    { $set: updateUserBody }
  );
  res.status(200).send(updateUser);
};

// Item Routes

exports.getSingleItem = async (req, res) => {
  const singleItem = await itemSchema.findById(req.params.itemId);
  res.status(200).send(singleItem);
};

exports.getAllItems = async (req, res) => {
  const allItems = await itemSchema.find();
  res.status(200).send(allItems);
};

exports.postItem = async (req, res) => {
  const item = new itemSchema({
    itemname: req.body.itemname,
    itemlocation: req.body.itemlocation,
    itemcategory: req.body.itemcategory,
    itemowner: req.body.itemowner,
    itemimgurl: req.body.itemimgurl,
  });
  const newItem = await item.save();
  res.status(201).send(newItem);
};

exports.patchItem = async (req, res) => {
  const updateItemBody = req.body;
  const updateItem = await itemSchema.updateOne(
    { _id: req.params.itemId },
    { $set: updateItemBody }
  );
  res.status(200).send(updateItem);
};

exports.deleteItem = async (req, res) => {
  const removeItem = await itemSchema.remove({ _id: req.params.itemId });
  res.status(204).send(removeItem);
};

// {
//     "itemname": "Golden Prada dress size M",
//     "itemlocation": "M205TG",
//     "itemcategory": "clothing",
//     "itemowner": "Kate Bush",
//     "itemimgurl":
//       "https://a.1stdibscdn.com/prada-gold-metallic-leather-dress-fairytale-for-sale/1121189/v_80933021574347855196/8093302_master.jpg"
//     }

// {
//   "itemname": "shoes",
//   "itemlocation": "D973TY",
//   "itemcategory": "clothing",
//   "itemowner": "QWERTY",
//   "itemimgurl":
//     "PICTURE OF SHOES"
//   }
