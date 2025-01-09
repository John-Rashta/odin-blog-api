const asyncHandler = require('express-async-handler');
const { body, validationResult, param, matchedData, query } = require("express-validator");
const prismaQuery = require("../util/prismaQueries");
const optionsHelper = require("../util/optionsHelper");
const validators = require("../util/validators");
const basicOptions = require("../util/basicOptions");
const {basicErrorMiddleware} = require("../middleware/errorMiddleware");
const passport = require("passport");

exports.showComments = [
    validators.postIdValidation,
    basicErrorMiddleware,
    asyncHandler(async (req, res) => {
        const {postid} = matchedData(req, {locations: ["params"]});
        const postComments = await prismaQuery.getComments({id: postid},basicOptions.postBasicOptions.select, basicOptions.commentBasicOptions);
        return res.json(postComments);
    })
];

exports.createComment =  [
    validators.postIdValidation.concat(validators.createCommentValidation),
    basicErrorMiddleware,
    asyncHandler(async (req, res) => {
        const {postid} = matchedData(req, {locations: ["params"]});
        const formData = matchedData(req, {locations: ["body"]});
        const {user, ...queryData} = formData;
        const createdComment = await prismaQuery.createComment({...queryData, create_date: new Date()}, postid, true && user, basicOptions.commentBasicOptions);
        return res.json(createdComment);
    })
];

exports.updateComment = [
    validators.postIdValidation.concat(validators.commentIdValidation, validators.updateCommentValidation, validators.headerValidation),
    basicErrorMiddleware,
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {
        const {postid, commentid} = matchedData(req, {locations: ["params"]});
        const formData = matchedData(req, {locations: ["body"]});
        const updatedComment = await prismaQuery.updateComment({id: commentid, postid }, {...formData}, basicOptions.commentBasicOptions)
        return res.json(updatedComment);
    })
];

exports.deleteComment = [
    validators.postIdValidation.concat(validators.commentIdValidation, validators.headerValidation),
    basicErrorMiddleware,
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {
        const {postid, commentid} = matchedData(req, {locations: ["params"]});
        const deletedComment = await prismaQuery.deleteComment({id: commentid, postid});
        return res.json(deletedComment);
    })
];
exports.getComment = [
    validators.postIdValidation.concat(validators.commentIdValidation),
    basicErrorMiddleware,
    asyncHandler(async (req, res) => {
        const {postid, commentid} = matchedData(req, {locations: ["params"]});
        const foundComment = await prismaQuery.getComment({id: commentid, postid}, basicOptions.commentBasicOptions);
        return res.json(foundComment);
    })
];