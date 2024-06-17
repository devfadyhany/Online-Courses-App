import multer from "multer";

const profileImagesStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "Images/profile");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const courseImagesStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "Images/course");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

export const profileImageUpload = multer({ storage: profileImagesStorage });
export const courseImageUpload = multer({ storage: courseImagesStorage });
