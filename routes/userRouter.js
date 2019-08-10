const { Router } = require("express");
const userController = require("../controllers/usersController");
const validateToken = require("../utils/utils").validateToken;

function routes(User) {
  const userRouter = Router();
  const controller = userController(User);

  userRouter
    .route("/")
    .post(controller.insert)
    .get(validateToken, controller.getAll);

  userRouter
    .route("/:userId")
    .get(controller.get)
    .put(controller.update)
    .delete(controller.remove);

  return userRouter;
}

module.exports = routes;
