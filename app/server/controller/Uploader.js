import multer from "multer";

export let file_src;

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
    file_src = Date.now() + file.originalname;
    callback(null, file_src);
  },
});

export const profileImageUpload = multer({ storage: profileImagesStorage });
export const courseImageUpload = multer({ storage: courseImagesStorage });
