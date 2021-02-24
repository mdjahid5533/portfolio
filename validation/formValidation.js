const {
    body
} = require('express-validator')

module.exports = formValidator = [
    body('title').isLength({
        min: 3,
        max: 100
    }).withMessage('Title must be between 3 to 100 charaters').trim(),

    body('catagory').custom(value => {
        if (!value) {
            return Promise.reject('Please select a valid catagory.')
        }
        return true
    }),

    body('price').not().isEmpty().withMessage('Price must be required..').trim(),

    body('description').isLength({
        min: 15,
        max: 5000
    }).withMessage('description must be between 15 to 5000 charaters').trim()
]
