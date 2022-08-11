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

exports.patchUserName = async (req, res) => {
  const updateUserName = await userSchema.updateOne(
    { _id: req.params.userId },
    { $set: { name: req.body.name } }
  );
  res.status(200).send(updateUserName);
};

/*Not Working -------->*/ exports.patchUserCharity = async (req, res) => {
  const updateUserCharity = await userSchema.updateOne(
    { _id: req.params.userId },
    { $set: { charity: req.body.charity } }
  );
  res.status(200).send(updateUserCharity);
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

exports.patchItemName = async (req, res) => {
  const updateItemName = await itemSchema.updateOne(
    { _id: req.params.itemId },
    { $set: { itemname: req.body.itemname } }
  );
  res.status(200).send(updateItemName);
};

/*Not Working -------->*/ exports.patchItemLocation = async (req, res) => {
  const updateItemLocation = await itemSchema.updateOne(
    { _id: req.params.itemId },
    { $set: { itemlocation: req.body.itemlocation } }
  );
  res.status(200).send(updateItemLocation);
};

/*Not Working -------->*/ exports.patchItemCategory = async (req, res) => {
  const updateItemCategory = await itemSchema.updateOne(
    { _id: req.params.itemId },
    { $set: { itemcategory: req.body.itemcategory } }
  );
  res.status(200).send(updateItemCategory);
};

/*Not Working -------->*/ exports.patchItemClaim = async (req, res) => {
  const updateItemClaim = await itemSchema.updateOne(
    { _id: req.params.itemId },
    { $set: { claimed: req.body.claimed } }
  );
  res.status(200).send(updateItemClaim);
};

/*Not Working -------->*/ exports.patchItemOwner = async (req, res) => {
  const updateItemOwner = await itemSchema.updateOne(
    { _id: req.params.itemId },
    { $set: { itemowner: req.body.itemowner } }
  );
  res.status(200).send(updateItemOwner);
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
