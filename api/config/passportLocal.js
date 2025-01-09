const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
require("dotenv").config();
const prismaQuery = require("../util/prismaQueries");

const verifyCallback = async (username, password, done) => {
    try {
      const user = await prismaQuery.getUserByUsername(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

