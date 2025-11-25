const mongoose = require('mongoose');
const validator = require('validator');

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
    },
    photo: String,

})

const User = mongoose.model('User', userSchema);

module.exports = User;