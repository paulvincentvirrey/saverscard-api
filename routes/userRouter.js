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
    .get(validateToken, controller.get)
    .put(validateToken, controller.replace)
    .patch(validateToken, controller.update)
    .delete(validateToken, controller.remove);

  userRouter
    .route("/updatepassword/:userId")
    .patch(validateToken, controller.updatePassword);

  return userRouter;
}

module.exports = routes;
