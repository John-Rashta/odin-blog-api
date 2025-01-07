const express = require("express");
const app = express();
const path = require("node:path");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
//TODO ROUTES
require("dotenv").config();
const {prisma} = require("./config/client");


app.use(express.urlencoded({ extended: true }));

require('./config/passport');

app.use(passport.initialize());

app.use((err, req, res, next) => {
    console.error(err);
    
    res.sendStatus(err.statusCode) || res.sendStatus(500);
  });

app.listen(8080);