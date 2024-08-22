// Import necessary libraries and modules
const router = require('express').Router(); // Import Express Router
const { User } = require("../models/user"); // Import User model from the user module
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const { validateLogin } = require('../validation/userValidation'); // Import validation functions from a utility file

// Define a route for POST requests to the root path
router.post('/', async (req, res) => {
    try {
        // Validate request body against schema
        const { error } = validateLogin(req.body); 
        if (error) {
            // Return a 400 Bad Request status if validation fails
            return res.status(400).send({ message: error.details[0].message });
        }

        // Check if a user with the provided email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            // Return a 401 Unauthorized status if no user found
            return res.status(401).send({ message: "Invalid email or password" });
        }

        // Compare the provided password with the stored hashed password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            // Return a 401 Unauthorized status if passwords do not match
            return res.status(401).send({ message: "Invalid email or password" });
        }
        
        // Generate an authentication token for the user
        const token = user.generateAuthToken();
        // Log the generated JWT token to the console
        console.log("Generated JWT Token:", token);
        // Return a 200 OK status with the token and success message
        res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
        // Handle any unexpected errors
        res.status(500).send({ message: "Internal server error" });
    }
});

// Export the router to be used in other parts of the application
module.exports = router;
