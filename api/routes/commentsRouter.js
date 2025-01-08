const { Router } = require("express");
const commentsController = require("../controllers/commentsController");
const commentsRouter = Router({ mergeParams: true });

commentsRouter.get("/", commentsController.showComments);
commentsRouter.post("/", commentsController.createComment);
commentsRouter.get("/:commentid", commentsController.getComment);
commentsRouter.put("/:commentid", commentsController.updateComment);
commentsRouter.delete("/:commentid", commentsController.deleteComment);


module.exports = commentsRouter;