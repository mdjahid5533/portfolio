const {
    Schema,
    model
} = require('mongoose')

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please tell us your title'],
        trim: true
    },
    catagory: {
        type: String,
        required: [true, 'Please tell us your catagory']
    },
    price: {
        type: String,
        required: [true, 'Please tell us your price'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please tell us your description'],
        trim: true
    },
    productImage: {
        type: String,
        required: [true, 'Picture is required']
    }
}, {
    timestamps: true
})

productSchema.index({
    title: 'text',
    catagory: 'text',
    description: 'text',
    price: 'text'
}, {
    weights: {
        title: 5,
        catagory: 5,
        description: 2,
        price: 4
    }
})

const Product = model('Product', productSchema)
module.exports = Product