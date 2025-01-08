const asyncHandler = require('express-async-handler');
const { body, validationResult, param, matchedData, query } = require("express-validator");
const prismaQuery = require("../util/prismaQueries");
const optionsHelper = require("../util/optionsHelper");
const { post } = require('../routes/accessRouter');

const postIdValidation = [
    param("postid")
        .toInt().isInt().withMessage("Must be an integer.")
];

const createPostValidation = [
    body("title")
        .isAscii().withMessage("Must only contain ascii characters."),
    body("content")
        .isAscii().withMessage("Must only contain ascii characters."),
    body("published")
        .optional({ values: "falsy" })
        .isBoolean().withMessage("Must be a boolean."),
    body("user")
        .optional({ values: "falsy" })
        .toInt().isInt().withMessage("Must be an integer."),
];

const searchPostValidation = [
    query("ORDERBY")
        .optional({ values: "falsy" })
        .isAlpha().withMessage("Must only be characters."),
    query("START")
        .optional({ values: "falsy" })
        .toInt().isInt().withMessage("Must be an integer."),
    query("AMOUNT")
        .optional({ values: "falsy" })
        .toInt().isInt().withMessage("Must be an integer."),
];

const updatePostValidation = [
    body("title")
        .optional({ values: "falsy" })
        .isAscii().withMessage("Must only contain ascii characters."),
    body("content")
        .optional({ values: "falsy" })
        .isAscii().withMessage("Must only contain ascii characters."),
    body("published")
        .optional({ values: "falsy" })
        .isBoolean().withMessage("Must be a boolean."),

]

exports.showPosts = [
    searchPostValidation,
    asyncHandler(async (req, res) => {
        const formOptions = optionsHelper(matchedData(req, {locations: ["query"]}));
        const allPosts = await prismaQuery.getPosts({
            select: {
                title: true,
                content: true,
                create_date: true,
            },
            ...formOptions
        })
        return res.json(allPosts);
    })
];

exports.createPost = [
    createPostValidation,
    asyncHandler(async (req, res) => {
        const result = validationResult(req);
        const rawFormData = matchedData(req);
        const {user, ...queryData} = rawFormData;
        const createdPost = await prismaQuery.createPost({...queryData, create_date: new Date()}, true && user);
        return res.json(createdPost);
    })
];

exports.updatePost = [
    postIdValidation.concat(updatePostValidation),
    asyncHandler(async (req, res) => {
        const formData = matchedData(req, {locations: ["body"]});
        const {postid} = matchedData(req, {locations: ["params"]});
        const updatedPost = await prismaQuery.updatePost({id: postid}, {...formData});
        return res.json(updatedPost);
    })
];

exports.deletePost = [
    postIdValidation,
    asyncHandler(async (req, res) => {
        const {postid} = matchedData(req, {locations: ["params"]});
        const deletedPost = await prismaQuery.deletePost({id: postid});
        return res.status(200).json();
    })
];

exports.getPost = [
    postIdValidation,
    asyncHandler(async (req, res) => {
        const {postid} = matchedData(req, {locations: ["params"]});
        const foundPost = await prismaQuery.getPost({id: postid});
        return res.json(foundPost);
    })
];