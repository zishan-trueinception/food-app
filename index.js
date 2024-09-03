const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan'); // http request logger
const dotenv = require('dotenv'); // env file
const connectDB = require('./config/db');

// rest object
const app = express()

// dotenv config
dotenv.config();

//connection stablish

connectDB();

// middlewares
app.use(express.json()); // to accept json data 
app.use(cors()); // cross origin resource sharing
app.use(morgan("dev")); // http request logger

// routes imports
app.use('/api/v1/test',require('./routes/testRoutes')); // test route
app.use('/api/v1/auth',require('./routes/authRoutes')); // auth route
app.use('/api/v1/category',require('./routes/categoryRoute')); // category route
app.use('/api/v1/user',require('./routes/userRoute')); // user route



// routes
app.get('/',(req,res)=>{
    res.status(200).send('<h1>Welcome to Food API Project</h1>')
});

// server port 
const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`.bgYellow.black);
})