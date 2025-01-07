const express = require("express");
const app = express();
const path = require("node:path");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
//TODO IMPORT ROUTES
require("dotenv").config();
const {prisma} = require("./config/client");


app.use(express.urlencoded({ extended: true }));

///require('./config/passportLocal');

app.use(passport.initialize());

app.use("/posts", postsRouter);
app.use("/posts/:postid/comments", commentsRouter);
app.use("/users", usersRouter);
app.use("/login", acessRouter);


app.use((err, req, res, next) => {
    console.error(err);
    
    res.sendStatus(err.statusCode) || res.sendStatus(500);
  });

app.listen(8080);