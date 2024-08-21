// Import the necessary modules
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interactions
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for generating authentication tokens

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true }, // First name of the user
    lastName: { type: String, required: true }, // Last name of the user
    email: { type: String, required: true, unique: true }, // Email of the user, must be unique
    password: { type: String, required: true }, // Password of the user, stored in hashed format
    passwordConfirm: { type: String, required: true } // Password confirmation (used only for validation purposes)
});

// Define a method on the schema to generate an authentication token
userSchema.methods.generateAuthToken = function () {
    // Create a JWT token with user id and secret key from environment variables
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN // Set token expiration from environment variable
    });
    return token;
};

// Create and export the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
