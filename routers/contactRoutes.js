const router = require('express').Router()
const {
    getContactController
} = require('../controllers/contactController')

router.get('/', getContactController)

module.exports = router