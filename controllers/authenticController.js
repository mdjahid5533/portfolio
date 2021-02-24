const User = require('../models/User')
const {
    validationResult
} = require('express-validator')
const errorResult = require('../utils/valiationErrorMasg')
const Flash = require('../utils/Flash')

exports.getLoginController = (req, res, next) => {
    // render Login Page
    res.render('project/authentication/login', {
        title: 'Login | Portfolio',
        path: '/project',
        errors: {},
        values: {},
        flashMasg: Flash.getMessage(req)
    })
}

exports.postLoginContoller = async (req, res, next) => {
    let {
        email,
        password
    } = req.body

    // if some error then return re-render Login Page with values
    let errors = validationResult(req).formatWith(errorResult)
    if (!errors.isEmpty()) {
        res.render('project/authentication/login', {
            title: 'Login | Portfolio',
            path: '/project',
            errors: errors.mapped(),
            values: {
                email,
                password
            },
            flashMasg: Flash.getMessage(req)
        })
    }

    try {
        // Seleted User gmail and Password
        let user = await User.findOne({
            email
        }).select('+password')

        // if gmail or password was wrong then re-render Login page with values
        if (!user || !(await user.comparePassword(password, user.password))) {
            req.flash('fail', 'Email or Password does not match..')
            return res.render('project/authentication/login', {
                title: 'Login | Portfolio',
                path: '/project',
                errors: errors.mapped(),
                values: {
                    email,
                    password
                },
                flashMasg: Flash.getMessage(req)
            })
        }

        // if all okay then redirect Form page
        res.redirect('/project/form')
    } catch (e) {
        next(e)
    }
}

exports.getSignupController = (req, res, next) => {
    // render Signup Page
    res.render('project/authentication/signup', {
        title: 'Signup | Portfolio',
        path: '/project',
        errors: {},
        values: {},
        flashMasg: Flash.getMessage(req)
    })
}

exports.postSignupController = async (req, res, next) => {
    let {
        username,
        email,
        password,
        confirmPassword,
        gender
    } = req.body

    // if some error then return re-render Signup Page with values
    let errors = validationResult(req).formatWith(errorResult)
    if (!errors.isEmpty()) {
        req.flash('fail', 'Something is Error, Please check it out..')
        return res.render('project/authentication/signup', {
            title: 'Signup | Portfolio',
            path: '/project',
            errors: errors.mapped(),
            values: {
                username,
                email,
                password,
                gender
            },
            flashMasg: Flash.getMessage(req)
        })
    }

    try {
        // Add new Contact ...
        let user = new User({
            username,
            email,
            password,
            confirmPassword,
            gender
        })
        await user.save()

        // redirect Login page
        res.redirect('/project/auth/login')
    } catch (e) {
        next(e)
    }
}