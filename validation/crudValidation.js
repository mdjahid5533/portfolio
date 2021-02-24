const {
    body
} = require('express-validator')

module.exports = crudValidation = [
    body('name').isLength({
        min: 3,
        max: 20
    }).withMessage('name must be between 2 to 20 charaters').trim(),

    body('email')
    .isEmail().withMessage('Please provide a valid email').trim(),

    body('phone').isLength({
        min: 9,
        max: 15
    }).withMessage('phone must be between 9 to 15 charaters').trim(),

    body('branch').custom(value => {
        if (!value) {
            return Promise.reject('Please select a valid branch.')
        }
        return true
    })
]