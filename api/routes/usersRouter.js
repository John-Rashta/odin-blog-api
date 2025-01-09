const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.post("/", usersController.createUser);
usersRouter.get("/:userid/posts", usersController.getUserPosts);
usersRouter.get("/:userid/comments", usersController.getUserComments);

module.exports = usersRouter;