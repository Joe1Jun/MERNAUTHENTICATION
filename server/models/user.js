const mongoose = require('mongoose'); // Import Mongoose for MongoDB object modeling
const jwt = require('jsonwebtoken'); // Import JWT for JSON Web Token operations
const Joi = require('joi'); // Import Joi for data validation
const passwordComplexity = require('joi-password-complexity'); // Import Joi Password Complexity for password validation

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    // Define the first name field as a required string
    firstName: { type: String, required: true },
    // Define the last name field as a required string
    lastName: { type: String, required: true },
    // Define the email field as a required string
    email: { type: String, required: true },
    // Define the password field as a required string
    password: { type: String, required: true },
    // Define the passwordConfirm field as a required string
    passwordConfirm: { type: String, required: true }
});

// Define a method on the userSchema to generate an authentication token
userSchema.methods.generateAuthToken = function () {
    // Generate a JSON Web Token (JWT) using the user's ID and a secret key from environment variables
    // 'this' refers to the current instance of the User model
    // The token expires based on the JWT_EXPIRES_IN environment variable
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    // Return the generated token
    return token;
};

// Create the User model from the userSchema
const User = mongoose.model("User", userSchema);

// Define a function to validate user data using Joi
const validate = (data) => {
    // Define a Joi schema for user registration validation
    const schema = Joi.object({
        // Validate firstName as a required string
        firstName: Joi.string().required().label("First Name"),
        // Validate lastName as a required string
        lastName: Joi.string().required().label("Last Name"),
        // Validate email as a required string
        email: Joi.string().required().label("Email"),
        // Validate password as a required string
        password: Joi.string().required().label("Password"),
    });

    // Validate the provided data against the schema
    // The function returns an object with 'error' and 'value' properties
    return schema.validate(data);
};

// Export the User model and validate function for use in other parts of the application
module.exports = { User, validate };
