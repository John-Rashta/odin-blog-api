const { setRandomFallback } = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { body, validationResult, param, matchedData, header } = require("express-validator");
const validators = require("../util/validators");

exports.loginUser = asyncHandler(async (req, res) => {
    ///TODO
    return res.status(404).json();
});