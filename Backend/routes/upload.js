const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer();
//upload.singleで"file"を指定しているので,keyに"file"が必要になる
router.post("/", upload.single("file"), (req, res) => {
  try {
    console.log("画像をアップ");
    return res.status(200).json("画像アップロードに成功しました");
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
