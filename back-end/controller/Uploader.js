// const multer = require("multer");
// const path = require("path");

// let file_src;
// const profileImagesStorage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "../Images");
//   },
//   filename: (req, file, callback) => {
//     file_src = Date.now() + path.extname(file.originalname);
//     callback(null, file_src);
//   },
// });

// const profileImageUpload = multer({ storage: profileImagesStorage });

// module.exports = { profileImageUpload, file_src };
