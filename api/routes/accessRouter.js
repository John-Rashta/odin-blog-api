const { Router } = require("express");
const accessController = require("../controllers/accessController");
const accessRouter = Router();

accessRouter.post("/", accessController.loginUser);

module.exports = accessRouter;