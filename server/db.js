// Importing the mongoose library for MongoDB object modeling

const mongoose = require('mongoose')
// Define an asynchronous function to connect to the MongoDB database
// The connection to the database is  over the network and therefore requires asynchronous operation because is can take time to complete
// the function pauses at the await keyword until the promise resolves or rejects
const db = async () => {
    
    try {
 // Set mongoose option to avoid deprecation warning
        mongoose.set('strictQuery', false)
        // Attempt to connect to the MongoDB database using the connection string from the environment variables
        await mongoose.connect(process.env.MONGO_URL)
        // Log a success message if the connection is established
        
        console.log('Db connected')
    } catch (error) {
        // Log the error message if the connection fails
        console.log(error)
      // Log a custom error message for clarity

        console.log('DB Connection Error')
    }
}
// Export the db function so it can be used in other parts of the application
module.exports = {db}