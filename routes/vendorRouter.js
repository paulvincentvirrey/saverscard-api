const { Router } = require("express");
const vendorsController = require("../controllers/vendorsController");
const validateToken = require("../utils/utils").validateToken;

function routes(Vendor) {
  const vendorRouter = Router();
  const controller = vendorsController(Vendor);

  vendorRouter
    .route("/")
    .post(controller.insert)
    .get(validateToken, controller.getAll);

  vendorRouter
    .route("/:vendorId")
    .get(validateToken, controller.get)
    .put(validateToken, controller.update)
    .patch(validateToken, controller.update)
    .delete(validateToken, controller.remove);

  vendorRouter
    .route("/updatepassword/:vendorId")
    .patch(validateToken, controller.updatePassword);

  return vendorRouter;
}

module.exports = routes;
