const validator = require('validator')
const {
    Schema,
    model
} = require('mongoose')

const crudSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name'],
        trim: true,
        maxlength: 20,
    },
    branch: {
        type: String,
        required: [true, 'Please tell us your branch'],
    },
    email: {
        type: String,
        required: [true, 'Please tell us your email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide valid email!']
    },
    phone: {
        type: String,
        required: [true, 'Please tell us your Phone Number'],
        trim: true,
        minlength: 9,
        maxlength: 15
    }
}, {
    timestamps: true
})

const Crud = model('Crud', crudSchema)
module.exports = Crud