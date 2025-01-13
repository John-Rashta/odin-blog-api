const { body, validationResult, param, matchedData, query, header } = require("express-validator");
const validator = require('validator');

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
        .trim()
        .isEmail().withMessage("Must be an email."),
    body("content")
        .trim()
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

const userIdValidation = [
    param("userid")
        .toInt().isInt().withMessage("Must be an integer.")
];

const createUserValidation = [
    body("username")
        .isAlphanumeric().withMessage("Must only contain numbers and/or characters."),
    body("password")
        .isAscii().withMessage("Password must only contain Ascii characters."),
    body("secret")
        .optional({ values: "falsy" })
        .isAscii().withMessage("Password must only contain Ascii characters."),
];

const createPostValidation = [
    body("title")
        .isAscii().withMessage("Must only contain ascii characters."),
    body("content")
        .isAscii().withMessage("Must only contain ascii characters."),
    body("published")
        .optional()
        .isBoolean().withMessage("Must be a boolean."),
    body("user")
        .optional({ values: "falsy" })
        .toInt().isInt().withMessage("Must be an integer."),
];

const searchValidation = [
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
        .optional()
        .isBoolean().withMessage("Must be a boolean."),

];


const headerValidation = [
    header("authorization")
        .notEmpty()
        .custom((value, {req}) => {
            const bearer = value.split(" ");
            return validator.isJWT(bearer[1]);
        }).withMessage("Needs to have a Json Web Token.")
];

const loginValidation = [
    body("username")
        .isAlphanumeric().withMessage("Must only contain numbers and/or characters."),
    body("password")
        .isAscii().withMessage("Password must only contain Ascii characters.")
];

module.exports = {
    headerValidation,
    loginValidation,
    updateCommentValidation,
    updatePostValidation,
    createCommentValidation,
    createPostValidation,
    searchValidation,
    createUserValidation,
    userIdValidation,
    commentIdValidation,
    postIdValidation
};