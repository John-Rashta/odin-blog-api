const {validationResult} = require("express-validator");

module.exports.basicErrorMiddleware = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const result = errors.formatWith(error => error.msg).array();
            return res.status(400).json(result);
        };
        next();
};