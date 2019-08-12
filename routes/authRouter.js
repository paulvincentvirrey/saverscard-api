const { Router } = require("express");
const authController = require("../controllers/authController");

function routes(User, Vendor) {
  const authRouter = Router();
  const controller = authController(User, Vendor);

  authRouter.route("/login").post(controller.login);

  return authRouter;
}

module.exports = routes;
