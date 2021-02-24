const router = require('express').Router()
const loginValidation = require('../validation/loginValidation')
const signupValidation = require('../validation/signupValidation')
const {
    getLoginController,
    postLoginContoller,
    getSignupController,
    postSignupController
} = require('../controllers/authenticController')

router
    .get('/login', getLoginController)
    .get('/signup', getSignupController)

router
    .post('/login', loginValidation, postLoginContoller)
    .post('/signup', signupValidation, postSignupController)

module.exports = router