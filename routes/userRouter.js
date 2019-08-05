const { Router } = require("express");
const userController = require("../controllers/usersController");

function routes(User) {
  const userRouter = Router();
  const controller = userController(User);

  userRouter
    .route("/")
    .post(controller.insert)
    .get(controller.getAll);

  userRouter
    .route("/:userId")
    .get(controller.get)
    .put(controller.update)
    .delete(controller.remove);

  return userRouter;
}

module.exports = routes;
