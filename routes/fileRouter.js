const { Router } = require("express");
const fileController = require("../controllers/fileController");

function routes() {
  const fileRouter = Router();
  const controller = fileController();

  fileRouter.route("/").post(controller.upload);

  return fileRouter;
}

module.exports = routes;
