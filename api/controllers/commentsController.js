const asyncHandler = require('express-async-handler');
const { body, validationResult, param, matchedData } = require("express-validator");

const postIdValidation = [
    param("postid")
        .isInt().withMessage("Must be an integer.")
];

const commentIdValidation = [
    param("commentid")
        .isInt().withMessage("Must be an integer.")
];

const createCommentValidation = [
    body("email")
        .isEmail().withMessage("Must be an email."),
    body("content")
        .isAscii().withMessage("Must only contain ascii characters."),
    body("user")
        .optional({ values: "falsy" })
        .isInt().withMessage("Must be an integer."),
];
exports.showComments = asyncHandler(async (req, res) => {
    ///TODO
    return res.status(404).json();
});

exports.createComment = asyncHandler(async (req, res) => {
    ///TODO
    return res.status(404).json();
});

exports.updateComment = asyncHandler(async (req, res) => {
    ///TODO
    return res.status(404).json();
});

exports.deleteComment = asyncHandler(async (req, res) => {
    ///TODO
    return res.status(404).json();
});

exports.getComment = asyncHandler(async (req, res) => {
    ///TODO
    return res.status(404).json();
});