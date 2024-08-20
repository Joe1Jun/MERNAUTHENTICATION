const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
require('dotenv').config();

const app = express();
//middlewares
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 8080

app.listen(port, () => {

    console.log("Listening on port 8080")
}
     
)
