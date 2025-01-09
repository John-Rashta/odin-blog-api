const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const path = require('path');
require("dotenv").config();
const prismaQuery = require("../util/prismaQueries");
const passport = require("passport");

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

const verifyCallback = async (jwt_payload, done) => {
    try {
      const user = await prismaQuery.getUser({id: jwt_payload.sub});
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch(err) {
      return done(err, false);
    }
};

const strategy = new JwtStrategy(options, verifyCallback);

passport.use(strategy);
