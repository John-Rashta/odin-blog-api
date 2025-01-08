const asyncHandler = require('express-async-handler');
const { body, validationResult, param, matchedData, query } = require("express-validator");
const prismaQuery = require("../util/prismaQueries");
const optionsHelper = require("../util/optionsHelper");

const postIdValidation = [
    param("postid")
        .toInt().isInt().withMessage("Must be an integer.")
];

const commentIdValidation = [
    param("commentid")
        .toInt().isInt().withMessage("Must be an integer.")
];

const createCommentValidation = [
    body("email")
        .isEmail().withMessage("Must be an email."),
    body("content")
        .isAscii().withMessage("Must only contain ascii characters."),
    body("user")
        .optional({ values: "falsy" })
        .toInt().isInt().withMessage("Must be an integer."),
];

const updateCommentValidation = [
    body("email")
        .optional({ values: "falsy" })
        .isEmail().withMessage("Must be an email."),
    body("content")
        .optional({ values: "falsy" })
        .isAscii().withMessage("Must only contain ascii characters."),
];

const searchOnlyCommentsValidation = [
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
exports.showComments = [
    postIdValidation,
    asyncHandler(async (req, res) => {
        const {postid} = matchedData(req, {locations: ["params"]});
        const postComments = await prismaQuery.getComments({id: postid});
        return res.json(postComments);
    })
];

exports.createComment =  [
    postIdValidation.concat(createCommentValidation),
    asyncHandler(async (req, res) => {
        const {postid} = matchedData(req, {locations: ["params"]});
        const formData = matchedData(req, {locations: ["body"]});
        const {user, ...queryData} = formData;
        console.log(postid)
        console.log(req.body)
        const createdComment = await prismaQuery.createComment({...queryData, create_date: new Date()}, postid, true && user);
        return res.json(createdComment);
    })
];

exports.updateComment = [
    postIdValidation.concat(commentIdValidation, updateCommentValidation),
    asyncHandler(async (req, res) => {
        const {postid, commentid} = matchedData(req, {locations: ["params"]});
        const formData = matchedData(req, {locations: ["body"]});
        const updatedComment = await prismaQuery.updateComment({id: commentid, postid }, {...formData})
        return res.json(updatedComment);
    })
];

exports.deleteComment = [
    postIdValidation.concat(commentIdValidation),
    asyncHandler(async (req, res) => {
        const {postid, commentid} = matchedData(req, {locations: ["params"]});
        const deletedComment = await prismaQuery.deleteComment({id: commentid, postid});
        return res.json(deletedComment);
    })
];
exports.getComment = [
    postIdValidation.concat(commentIdValidation),
    asyncHandler(async (req, res) => {
        const {postid, commentid} = matchedData(req, {locations: ["params"]});
        const foundComment = await prismaQuery.getComment({id: commentid, postid});
        return res.json(foundComment);
    })
];