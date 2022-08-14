const ImgurStorage = require("multer-storage-imgur");
const multer = require("multer");

const upload = multer({
  storage: ImgurStorage({ clientId: process.env.IMGUR_ID }),
});

module.exports = upload;
