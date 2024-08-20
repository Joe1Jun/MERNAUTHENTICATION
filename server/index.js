// Import the required modules
// Import Express framework
const express = require('express')
// Import CORS middleware
const cors = require('cors')
// Import the database connection function from db module
const { db } = require('./db')
// Import readdirSync function from fs module to read the routes directory
//const { readdirSync } = require('fs')
// Create an instance of Express
const app = express()

// Load environment variables from a .env file into process.env
require('dotenv').config()
// Get the port number from environment variables
const PORT = process.env.PORT

//middlewares
// Middleware to parse JSON bodies
app.use(express.json())
// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors())

//routes
// Dynamically read all files in the 'routes' directory and use them as routes
//readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

// Function to start the server
const server = () => {
    // Initialize the database connection
    db()
    // Start the server and listen on the specified port
    app.listen(PORT, () => {
        // Log a message when the server is running
        console.log("listening on port:" , PORT)
    })

}
// Call the server function to start the server
server()