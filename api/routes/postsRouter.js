const { Router } = require("express");
const postsController = require("../controllers/postsController");
const postsRouter = Router();

postsRouter.get("/", postsController.showPosts);
postsRouter.post("/", postsController.createPost);
postsRouter.get("/:postid", postsController.getPost);
postsRouter.put("/:postid", postsController.updatePost);
postsRouter.delete("/:postid", postsController.deletePost);


module.exports = postsRouter;