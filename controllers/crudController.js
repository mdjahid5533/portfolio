const Crud = require('../models/Crud')
const {
    validationResult
} = require('express-validator')
const validationError = require('../utils/valiationErrorMasg')
const Flash = require('../utils/Flash')

exports.getCrudController = async (req, res, next) => {
    try {
        // Find All Contacts
        let contact = await Crud.find()

        // render crud routes
        res.render('project/crud', {
            title: 'CRUD | Portfolio',
            contact,
            path: '/project',
            errors: {},
            values: {},
            flashMasg: Flash.getMessage(req)
        })
    } catch (e) {
        next(e)
    }
}

exports.postCrudController = async (req, res, next) => {
    let {
        name,
        branch,
        email,
        phone,
        id
    } = req.body

    try {
        // Find All Contacts
        let contact = await Crud.find()

        // if some error then return re-render CRUD Routes with values
        let errors = validationResult(req).formatWith(validationError)
        if (!errors.isEmpty()) {
            return res.render('project/crud', {
                title: 'CRUD | Portfolio',
                path: '/project',
                contact,
                errors: errors.mapped(),
                values: {
                    name,
                    branch,
                    email,
                    phone
                },
                flashMasg: Flash.getMessage(req)
            })
        }

        // Add new Contact ...
        let crud = new Crud({
            name,
            branch,
            email,
            phone
        })
        if (!id) {
            // save new Contact ...
            await crud.save()
        } else {
            // if already have user ID then update User Information..
            await Crud.findOneAndUpdate({
                _id: id
            }, {
                $set: {
                    name,
                    branch,
                    email,
                    phone
                }
            })
        }

        // if all is okay then return redirect CRUD Routes
        res.redirect('/project/crud')
    } catch (e) {
        next(e)
    }
}


exports.getDeleteController = async (req, res, next) => {
    let {
        _id
    } = req.params

    try {
        // Deleted User and redirect CRUD Rutes
        await Crud.findByIdAndDelete({
            _id
        })
        res.redirect('/project/crud')
    } catch (e) {
        next(e)
    }
}