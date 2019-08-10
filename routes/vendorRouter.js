const { Router } = require("express");
const vendorsController = require("../controllers/vendorsController");
const validateToken = require("../utils/utils").validateToken;

function routes(Vendor) {
  const vendorRouter = Router();
  const controller = vendorsController(Vendor);

  vendorRouter
    .route("/")
    .post(controller.insert)
    .get(controller.getAll);

  vendorRouter
    .route("/:vendorId")
    .get(controller.get)
    .put(controller.update)
    .patch(controller.update)
    .delete(controller.remove);

  return vendorRouter;
}

module.exports = routes;
