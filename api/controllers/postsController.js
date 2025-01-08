const asyncHandler = require('express-async-handler');
const { body, validationResult, param, matchedData } = require("express-validator");

const postIdValidation = [
    param("postid")
        .isInt().withMessage("Must be an integer.")
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
        .isInt().withMessage("Must be an integer."),
];

exports.showPosts = asyncHandler(async (req, res) => {
    ///TODO
    return res.status(404).json();
});

exports.createPost = asyncHandler(async (req, res) => {
    ///TODO
    return res.status(404).json();
});

exports.updatePost = asyncHandler(async (req, res) => {
    ///TODO
    return res.status(404).json();
});

exports.deletePost = asyncHandler(async (req, res) => {
    ///TODO
    return res.status(404).json();
});

exports.getPost = asyncHandler(async (req, res) => {
    ///TODO
    return res.status(404).json();
});