const Joi = require('joi'); // Import Joi for validation

// Define validation schema for registration
const validateRegistration = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label('First Name'),
        lastName: Joi.string().required().label('Last Name'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password'),
        passwordConfirm: Joi.string().required().valid(Joi.ref('password')).label('Password Confirmation') // Ensure passwordConfirm matches password
    });
    return schema.validate(data);
}

// Define validation schema for login
const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
    });
    return schema.validate(data);
}

module.exports = { validateRegistration, validateLogin };
