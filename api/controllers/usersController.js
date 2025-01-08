const asyncHandler = require('express-async-handler');
const { body, validationResult, param, matchedData } = require("express-validator");
const bcrypt = require('bcryptjs');
const validators = require("../util/validators");
const optionsHelper = require("../util/optionsHelper");

exports.createUser = asyncHandler(async (req, res) => {
    ///TODO
    return res.status(404).json();
});

exports.getUserPosts = [
    validators.userIdValidation.concat(validators.searchValidation),
    asyncHandler(async (req, res) => {
        const {userid} = matchedData(req, {locations: ["params"]});
        const formOptions = optionsHelper(matchedData(req, {locations: ["query"]}));
        const allPosts = await prismaQuery.getPosts({
            select: {
                title: true,
                content: true,
                create_date: true,
                published: true
            },
            where: {
                authorid: userid
            },
            ...formOptions
        });
        return res.json(allPosts);
    })
];