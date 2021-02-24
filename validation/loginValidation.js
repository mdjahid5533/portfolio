const {
    body
} = require('express-validator')

module.exports = loginValiation = [
    body('email').not().isEmpty().withMessage('Please provide a valid email..'),

    body('password').not().isEmpty().withMessage('Password must be greater than 8 charaters')
]