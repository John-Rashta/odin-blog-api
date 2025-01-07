const asyncHandler = require('express-async-handler');
const { body, validationResult, param, matchedData } = require("express-validator");
const bcrypt = require('bcryptjs');

exports.createUser = asyncHandler(async (req, res) => {
    ///TODO
});
