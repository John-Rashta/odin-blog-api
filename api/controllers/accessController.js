const { setRandomFallback } = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { body, validationResult, param, matchedData, header } = require("express-validator");

const headerValidation = [
    header("authorization")
        .isJWT().withMessage("Needs to have a Json Web Token.")
];

const loginValidation = [
    body("username")
        .isAlphanumeric().withMessage("Must only contain numbers and/or characters."),
    body("password")
        .isAscii().withMessage("Password must only contain Ascii characters.")
];

exports.loginUser = asyncHandler(async (req, res) => {
    ///TODO
    return res.status(404).json();
});