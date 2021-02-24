const router = require('express').Router()
const {
    getResumeController
} = require('../controllers/resumeController')

router.get('/', getResumeController)

module.exports = router