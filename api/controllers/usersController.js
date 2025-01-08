const asyncHandler = require('express-async-handler');
const { body, validationResult, param, matchedData } = require("express-validator");
const bcrypt = require('bcryptjs');

const createUserValidation = [
    body("username")
        .isAlphanumeric().withMessage("Must only contain numbers and/or characters."),
    body("password")
        .isAscii().withMessage("Password must only contain Ascii characters."),
    body("secret")
        .optional({ values: "falsy" })
        .isAscii().withMessage("Password must only contain Ascii characters."),
];

exports.createUser = asyncHandler(async (req, res) => {
    ///TODO
    return res.status(404).json();
});
