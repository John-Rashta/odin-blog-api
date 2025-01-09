const express = require("express");
const app = express();
const path = require("node:path");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");
const usersRouter = require("./routes/usersRouter");
const accessRouter = require("./routes/accessRouter");
const cors = require("cors");
require("dotenv").config();
const {prisma} = require("./config/client");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/passportLocal');
require('./config/passportJWT');

app.use(passport.initialize());
app.use(cors());
app.use("/posts", postsRouter);
app.use("/posts/:postid/comments", commentsRouter);
app.use("/users", usersRouter);
app.use("/login", accessRouter);


app.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).json({message: "internal error"});
  });

app.listen(8080);