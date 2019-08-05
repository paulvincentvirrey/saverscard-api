const { Router } = require("express");
const authController = require("../controllers/authController");

function routes(User) {
  const authRouter = Router();
  const controller = authController(User);

  authRouter.route("/login").post(controller.login);

  return authRouter;
}

module.exports = routes;
