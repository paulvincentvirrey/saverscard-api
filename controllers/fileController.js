const multer = require("multer");
const path = require("path");
const fs = require("fs");

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

  function download(req, res) {
    const fileTypes = [".pdf"];
    // Check if the right request is coming through for the file type
    return (
      new Promise((resolve, reject) => {
        if (
          req.query.file &&
          fileTypes.indexOf(path.extname(req.query.file)) > -1
        ) {
          return resolve(req.query.file);
        }
        return reject(
          `Please provide a file type of ?file=${fileTypes.join("|")}`
        );
      })
        // Validate if the files exists
        .then(file => {
          return new Promise((resolve, reject) => {
            if (fs.existsSync(`./${file}`)) {
              return resolve(`./${file}`);
            }
            return reject(`File ./'${file}' was not found.`);
          });
        })
        // Return the file to download
        .then(filePath => {
          res.download(filePath);
        })
        // Catches errors and displays them
        .catch(e => {
          res.status(400).send({
            message: e
          });
        })
    );
  }
  return { upload, download };
}

module.exports = fileController;
