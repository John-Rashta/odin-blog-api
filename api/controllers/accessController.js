const asyncHandler = require('express-async-handler');
const { body, validationResult, param, matchedData, header } = require("express-validator");
const validators = require("../util/validators");
const {basicErrorMiddleware} = require("../middleware/errorMiddleware");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const passport = require("passport");


exports.loginUser = [
    validators.loginValidation,
    basicErrorMiddleware,
    passport.authenticate("local", {
        session: false
      }),
    asyncHandler(async (req, res) => {
        jwt.sign({id: req.user.id}, process.env.SECRET_KEY, {expiresIn: "2d" }, (err, token) => {
            if (err) {
                console.log(err);
            }

            res.json({
                id: req.user.id,
                token
            });
        });
    })
];