var multer = require("multer");

function fileController() {
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "invoices");
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    }
  });

  var uploader = multer({ storage: storage }).single("file");
  function upload(req, res) {
    uploader(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
        // A Multer error occurred when uploading.
      } else if (err) {
        return res.status(500).json(err);
        // An unknown error occurred when uploading.
      }
      return res.status(200).send(req.file);
      // Everything went fine.
    });
  }
  return { upload };
}

module.exports = fileController;
