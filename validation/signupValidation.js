const {
    body
} = require('express-validator')
const User = require('../models/User')

module.exports = loginValiation = [
    body('email').not().isEmpty().withMessage('Please provide a valid email..'),

    body('password').not().isEmpty().withMessage('Password must be greater than 8 charaters')
]

module.exports = signupValiation = [
    body('username').isLength({
        min: 2,
        max: 15
    }).withMessage('username must be between 2 to 15 charaters').custom(async username => {
        let user = await User.findOne({
            username
        })
        if (user) {
            return Promise.reject('Email already used')
        }
    }).trim(),

    body('email').isEmail().withMessage('Please provide a valid email').custom(async email => {
        let user = await User.findOne({
            email
        })
        if (user) {
            return Promise.reject('Email already used')
        }
    }).isLowercase().trim(),

    body('password').isLength({
        min: 8
    }).withMessage('Password must be greater than 8 charaters'),

    body('confirmPassword').isLength({
        min: 8
    }).withMessage('Confirm Password must be greater than 8 charaters').custom(async (confirmPassword, {
        req
    }) => {
        if (confirmPassword !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true
    }),

    body('gender').custom(value => {
        if (!value) {
            return Promise.reject('Please select a valid gender.')
        }
        return true
    })
]