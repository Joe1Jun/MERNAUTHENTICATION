const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordConfirm: { type: String, required: true },
    
})

userSchema.methods.generateAuthToken = function () {
    
    const token = jwt.sign({ id: this_id }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN })
    return token

};

const User = mongoose.model("user", userSchema);