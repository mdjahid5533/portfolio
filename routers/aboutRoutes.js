const router = require('express').Router()
const {
    getAboutController
} = require('../controllers/aboutController')

router.get('/', getAboutController)

module.exports = router