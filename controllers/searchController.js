const Flash = require('../utils/Flash')
const Product = require('../models/Product')

exports.searchResult = async (req, res, next) => {
    let term = req.query.term

    try {
        // COUNT SEARCH ITEM
        let allProduct = await Product.find({
            $text: {
                $search: term
            }
        })

        // Render Search item
        res.render('page/search', {
            title: `result for ${term}`,
            searchTerm: term,
            path: '/project',
            allProduct,
            flashMasg: Flash.getMessage(req)
        })
    } catch (e) {
        next(e)
    }
}