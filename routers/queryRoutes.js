const router = require('express').Router()
const {
    getQueryController
} = require('../controllers/queryControllers')

router.get('/', getQueryController)

module.exports = router