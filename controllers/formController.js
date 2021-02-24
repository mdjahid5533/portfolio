const Product = require('../models/Product')
const {
    validationResult
} = require('express-validator')
const errorValidation = require('../utils/valiationErrorMasg')
const Flash = require('../utils/Flash')

exports.getFormController = async (req, res, next) => {
    try {
        // Code for PAGINATION
        let allProduct = await Product.find()
        let Reverse = allProduct.reverse().slice(0, 6)

        // Form Page Render
        res.render('project/form', {
            title: 'Form | Portfolio',
            path: '/project',
            Reverse,
            errors: {},
            values: {},
            flashMasg: Flash.getMessage(req)
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
}

exports.postFromController = async (req, res, next) => {
    let {
        title,
        catagory,
        price,
        description
    } = req.body

    try {
        // Code for PAGINATION
        let allProduct = await Product.find()
        let Reverse = allProduct.reverse().slice(0, 6)

        // If Error then return form page
        let errors = validationResult(req).formatWith(errorValidation)
        if (!errors.isEmpty()) {
            return res.render('project/form', {
                title: 'Form | Portfolio',
                path: '/project',
                errors: errors.mapped(),
                values: {
                    title,
                    catagory,
                    price,
                    description
                },
                Reverse,
                flashMasg: Flash.getMessage(req)
            })
        }

        // Add New Product..
        let product = new Product({
            title,
            catagory,
            price,
            description,
            productImage: req.file ? `/images/uploads/${req.file.filename}` : ''
        })
        await product.save()

        // add product and return form Page Redirect
        res.redirect('/project/form')
    } catch (e) {
        next(e)
    }
}

exports.getSingleProduct = async (req, res, next) => {
    let {
        id
    } = req.params

    try {
        // find Single page _id
        let findProduct = await Product.findById(id)
        if (!findProduct) {
            res.json({
                message: 'Error'
            })
        }

        // render single product
        res.render('project/single-page', {
            title: findProduct.title,
            path: '/project',
            errors: {},
            values: {},
            flashMasg: Flash.getMessage(req),
            findProduct
        })
    } catch (e) {
        next(e)
    }
}