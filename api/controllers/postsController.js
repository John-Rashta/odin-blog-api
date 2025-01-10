const asyncHandler = require('express-async-handler');
const { body, validationResult, param, matchedData, query } = require("express-validator");
const prismaQuery = require("../util/prismaQueries");
const optionsHelper = require("../util/optionsHelper");
const validators = require("../util/validators");
const basicOptions = require("../util/basicOptions");
const {basicErrorMiddleware} = require("../middleware/errorMiddleware");
const passport = require("passport");

exports.showPosts = [
    validators.searchValidation,
    basicErrorMiddleware,
    asyncHandler(async (req, res) => {
        const formOptions = optionsHelper(matchedData(req, {locations: ["query"]}));
        const allPosts = await prismaQuery.getPosts({
            select: {
                title: true,
                content: true,
                create_date: true,
                id: true,
            },
            where: {
                published: true
            },
            ...formOptions

        })
        return res.json(allPosts);
    })
];

exports.createPost = [
    validators.createPostValidation.concat(validators.headerValidation),
    basicErrorMiddleware,
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {
        const rawFormData = matchedData(req, {locations: ["body"]});
        const {user, ...queryData} = rawFormData;
        const createdPost = await prismaQuery.createPost({...queryData, create_date: new Date()}, true && user, basicOptions.postBasicOptions);
        return res.json(createdPost);
    })
];

exports.updatePost = [
    validators.postIdValidation.concat(validators.updatePostValidation, validators.headerValidation),
    basicErrorMiddleware,
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {
        const formData = matchedData(req, {locations: ["body"]});
        const {postid} = matchedData(req, {locations: ["params"]});
        const updatedPost = await prismaQuery.updatePost({id: postid}, {...formData}, basicOptions.postBasicOptions);
        return res.json(updatedPost);
    })
];

exports.deletePost = [
    validators.postIdValidation.concat(validators.headerValidation),
    basicErrorMiddleware,
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {
        const {postid} = matchedData(req, {locations: ["params"]});
        const deletedPost = await prismaQuery.deletePost({id: postid});
        return res.status(200).json();
    })
];

exports.getPost = [
    validators.postIdValidation,
    basicErrorMiddleware,
    asyncHandler(async (req, res) => {
        const {postid} = matchedData(req, {locations: ["params"]});
        const foundPost = await prismaQuery.getPost({id: postid}, basicOptions.postBasicOptions);
        return res.json(foundPost);
    })
];