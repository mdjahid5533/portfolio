const router = require('express').Router()
const {
    searchResult
} = require('../controllers/searchController')

router.get('/', searchResult)

module.exports = router