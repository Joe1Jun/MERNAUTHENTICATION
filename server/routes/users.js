/// Import the necessary modules
const router = require('express').Router(); // Creates a new instance of an Express router for handling routes
const { User } = require ('../models/user')
const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords
const { validateRegistration } = require('../validation/userValidation'); // Import validation functions from a utility file

// Define a POST route handler for user registration
router.post('/register', async (req, res) => {
    try {
        const { error } = validateRegistration(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).send({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        console.log(error); // Log the error to the console
        res.status(500).send({ message: "Internal server error" });
    }
});


// Export the router for use in other parts of the application
module.exports = router;
