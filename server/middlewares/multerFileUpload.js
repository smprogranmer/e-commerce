const multer = require("multer");
const path = require("path");
const { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } = require("../config");

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "uploads/"); // Ensure this folder exists
  // },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const baseName = file.originalname.replace(extname, "");
    const newFileName = `${Date.now()}_${baseName}${extname}`;
    console.log("🚀 ~ Saved File Name:", newFileName);
    cb(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase().substring(1);
  if (!ALLOWED_FILE_TYPES.includes(extname)) {
    return cb(new Error("File type not supported"), false);
  }
  cb(null, true);
};

// Allow multiple file uploads (max 5 files)
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10},
  fileFilter: fileFilter,
}).array("images", 5); // Accepts "images" field with max 5 files

module.exports = upload;
