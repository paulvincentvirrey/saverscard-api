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
    .put(controller.replace)
    .patch(controller.update)
    .delete(controller.remove);

  userRouter.route("/updatepassword/:userId").patch(controller.updatePassword);

  return userRouter;
}

module.exports = routes;
