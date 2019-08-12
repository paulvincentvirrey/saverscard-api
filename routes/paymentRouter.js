const { Router } = require("express");
const userController = require("../controllers/paymentsController");
const validateToken = require("../utils/utils").validateToken;

function routes() {
  const paymentRouter = Router();
  const controller = userController();

  paymentRouter.route("/").post(controller.charge);

  return paymentRouter;
}

module.exports = routes;
