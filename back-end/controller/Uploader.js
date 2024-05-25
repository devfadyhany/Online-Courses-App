import multer from "multer";
import path from "path";

const profileImagesStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "Images/profile");
  },
  filename: (req, file, callback) => {
    file_src = Date.now() + path.extname(file.originalname);
    callback(null, file_src);
  },
});

export const profileImageUpload = multer({ storage: profileImagesStorage });