const asyncHandler = require('express-async-handler');
const { body, validationResult, param, matchedData } = require("express-validator");
const bcrypt = require('bcryptjs');
const validators = require("../util/validators");
const optionsHelper = require("../util/optionsHelper");
const {basicErrorMiddleware} = require("../middleware/errorMiddleware");
require("dotenv").config();
const prismaQuery = require("../util/prismaQueries");
const passport = require("passport");

exports.createUser = [ 
    validators.createUserValidation,
    basicErrorMiddleware,
    asyncHandler(async (req, res) => {
        const formData = matchedData(req);
        const invalidUser = await prismaQuery.getUserByUsername(formData.username);
        if (invalidUser) {
            return res.status(502).json({message: "Username already exists."});
        }
        bcrypt.hash(formData.password, 10, async (err, hashedPassword) => {
            // if err, do something
            if (err) {
                console.log(err);
            }
            // otherwise, store hashedPassword in DB
            await prismaQuery.createUser({
                username: formData.username, 
                password: hashedPassword,
                ...(Object.hasOwn(formData, "secret") && formData.secret === process.env.SECRET_ADMIN ? {admin: true} : {})
            })
        });

        return res.status(200).json();
    })
] ;

exports.getUserPosts = [
    validators.userIdValidation.concat(validators.searchValidation, validators.headerValidation),
    basicErrorMiddleware,
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {
        const {userid} = matchedData(req, {locations: ["params"]});
        const formOptions = optionsHelper(matchedData(req, {locations: ["query"]}));
        const allPosts = await prismaQuery.getUserPosts(userid, formOptions);
        return res.json(allPosts);
    })
];

exports.getUserComments = [
    validators.userIdValidation.concat(validators.searchValidation, validators.headerValidation),
    basicErrorMiddleware,
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {
        const {userid} = matchedData(req, {locations: ["params"]});
        const formOptions = optionsHelper(matchedData(req, {locations: ["query"]}));
        const allComments = await prismaQuery.getUserComments(userid, formOptions);
        return res.json(allComments);
    })
];