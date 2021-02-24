const router = require('express').Router()
const {
    getFormController,
    postFromController,
    getSingleProduct
} = require('../controllers/formController')
const formValidator = require('../validation/formValidation')
const upload = require('../middleware/uploadMiddleware')

router
    .get('/form', getFormController)
    .get('/single-product/:id', getSingleProduct)

router
    .post('/form', upload.single('productImage'), postFromController)

module.exports = router