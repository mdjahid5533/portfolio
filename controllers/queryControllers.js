const Flash = require('../utils/Flash')
const Product = require('../models/Product')

// Function for called by specific Filter name 
function genaretFilter(filter) {
    let filterObj = {}
    let order = 1

    switch (filter) {
        case 'books': {
            filterObj = {
                catagory: 'Books'
            }
            order = -1
            break
        }
        case 'mobile': {
            filterObj = {
                catagory: 'Mobile'
            }
            order = -1
            break
        }
        case 'laptop': {
            filterObj = {
                catagory: 'Laptop'
            }
            order = -1
            break
        }
        case 'motor': {
            filterObj = {
                catagory: 'Motor Bike'
            }
            order = -1
            break
        }
        case 'all': {
            order = -1
            break
        }
    }
    return {
        filterObj,
        order
    }
}

exports.getQueryController = async (req, res, next) => {
    let filter = req.query.filter || 'all'
    let currentPage = parseInt(req.query.page) || 1
    let itemPerPage = 12
    let {
        filterObj,
        order
    } = genaretFilter(filter.toLowerCase())

    try {
        // code for pagination
        let allProduct = await Product.find(filterObj)
        .sort(order === 1 ? 'createdAt' : '-createdAt')
        .skip((currentPage * itemPerPage) - itemPerPage)
        .limit(itemPerPage)

        // Total product and Total page number
        let totalProduct = await Product.countDocuments()
        let totalPage = Math.ceil(totalProduct / itemPerPage)

        // render query Routes
        res.render('project/query', {
            title: 'Query | Portfolio',
            path: '/project',
            filter,
            allProduct,
            currentPage,
            itemPerPage,
            totalPage,
            flashMasg: Flash.getMessage(req)
        })
    } catch (e) {
        next(e)
    }
}