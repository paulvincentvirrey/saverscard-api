const express = require("express");
const vendorsController = require("../controllers/vendorsController");

function routes(Vendor) {
  const vendorRouter = express.Router();
  const controller = vendorsController(Vendor);

  vendorRouter
    .route("/")
    .post(controller.insert)
    .get(controller.getAll);

  vendorRouter
    .route("/:vendorId")
    .get(controller.get)
    .put(controller.update)
    .delete(controller.remove);

  return vendorRouter;
}

module.exports = routes;
