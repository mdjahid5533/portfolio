const bcrypt = require('bcrypt')
const validator = require('validator')
const {
    Schema,
    model
} = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please tell us your username'],
        trim: true,
        maxlength: 15
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please tell us your email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide valid email!']
    },
    password: {
        type: String,
        required: [true, 'Please tell us your password'],
        minlength: 8
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please tell us your password'],
        minlength: 8,
        validate: {
            validator: function (cm) {
                return this.password === cm
            },
            message: 'Password Does not match'
        }
    },
    gender: {
        type: String,
        required: [true, 'Please tell us your gender'],
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()

    this.password =  await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined
    next()
})

userSchema.methods.comparePassword = async function(currentPassword, password) {
    return await bcrypt.compare(currentPassword, password)
}

const User = model('User', userSchema)
module.exports = User