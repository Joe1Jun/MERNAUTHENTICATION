/// Import the necessary modules
const router = require('express').Router(); // Creates a new instance of an Express router for handling routes
const { User } = require('../models/user'); // Import the User model from the user module
const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords
const { validateRegistration } = require('../utils/validation'); // Import validation functions from a utility file

// Define a POST route handler for user registration
router.post('/register', async (req, res) => {
    try {
        // Validate the incoming request data using the validateRegistration function
        const { error } = validateRegistration(req.body); // Destructure error from the validation result
        if (error) {
            // If validation fails, respond with a 400 Bad Request status and the validation error message
            return res.status(400).send({ message: error.details[0].message });
        }

        // Check if a user with the provided email already exists in the database
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            // If user already exists, respond with a 409 Conflict status and a message
            return res.status(409).send({ message: "User already exists" });
        }

        // Generate a salt for password hashing
        const salt = await bcrypt.genSalt(Number(process.env.SALT)); // Generate a salt with the number of rounds specified in the environment variable
        // Hash the password with the generated salt
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user instance with the hashed password and save it to the database
        await new User({ ...req.body, password: hashPassword }).save(); // Spread the request body and override the password field with the hashed password

        // Respond with a 201 Created status and a success message
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        // Handle any unexpected errors
        res.status(500).send({ message: "Internal server error" });
    }
});

// Export the router for use in other parts of the application
module.exports = router;
