const { Router } = require("express");
const fileController = require("../controllers/fileController");

function routes() {
  const fileRouter = Router();
  const controller = fileController();

  fileRouter.route("/upload").post(controller.upload);
  fileRouter.route("/download").get(controller.download);

  return fileRouter;
}

module.exports = routes;
