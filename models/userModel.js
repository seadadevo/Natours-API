const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name'],
        unique: true,
    } ,
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowecase: true,
        validate: [validator.isEmail, "Invalid email format"],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [8, 'password must be at least 8 characters' ]
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm a password'],
        validate: {
            validator: function(el){
                return el === this.password;
            },
            message: 'Passwords are not the same'
        }
    },
    photo: String,

})

userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    // Delete the password confirm field
    this.passwordConfirm = undefined;
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;