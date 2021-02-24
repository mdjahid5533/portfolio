const router = require('express').Router()
const {
    getCrudController,
    postCrudController,
    getDeleteController
} = require('../controllers/crudController')
const validation = require('../validation/crudValidation')


router
    .get('/', getCrudController)
    .get('/delete/:_id', getDeleteController)

router
    .post('/', validation, postCrudController)


module.exports = router