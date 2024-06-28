const multer = require("multer");
const path = require("path");
const { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } = require("../config");

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "upload");
  // },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const ex = file.originalname.replace(extname, "") + extname;
    // console.log("🚀 ~ file: uploadFile.js:12 ~ ex:", ex)
    // console.log(ex);
    cb(
      null,
      Date.now() + "_" + file.originalname.replace(extname, "") + extname
    );
  },
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname);
  console.log(process.env.ALLOWED_FILE_TYPES);
  if (!ALLOWED_FILE_TYPES.includes(extname.substring(1))) {
    return cb(new Error("file type not supoted"),false);
  }
  cb(null, true);
};

// const storage = multer.memoryStorage();

// const fileFilter = (req,file,cb) =>{
//   if(!file.mimetype.startsWith("image/")){
//     return cb(new Error("only image files are allowed"),false)
//   }
//   if(file.size > MAX_FILE_SIZE){
//     return cb(new Error("file size exceds the maximum limit"),false)
//   }
//   if(!ALLOWED_FILE_TYPES.includes(file.mimetype)){
//     return cb(new Error("file type is not allowed"),false)
//   }
//   console.log(file)
//   cb(null,true)
// }

const upload = multer({ storage: storage, limits: {fileSize: 1024 * 1024 * 10,fieldSize: 1024 * 1024 * 10 },fileFilter });
console.log("🚀 ~ file: uploadFile.js:30 ~ MAX_FILE_SIZE:", MAX_FILE_SIZE)

module.exports = upload;
