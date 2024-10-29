// Importing dependencies
require('dotenv').config();
const express = require('express');
const os = require('os');
const cluster = require('cluster');
const connectDb = require('./DB/db_conn');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Importing routes
const router = require('./routes/routes');
const userRoute = require('./routes/user_routes');
const tokenroute = require('./routes/token_route');

// Constants
const availableCpus = os.availableParallelism();
const port = 3000; // Port for the server

// Create Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', // Vite.js frontend URL
    credentials: true, // Allow cookies to be sent with the request
}));

// Logging middleware
const logs = (req, res, next) => {
    console.log(`${req.method} ${req.url} -- `, req.body);
    next();
};
app.use(logs);

// Routes setup
app.use('/url', router); // URL shortening routes
app.use('/user', userRoute); // User-related routes
app.use('/access', tokenroute); // User-related routes

// Database connection and server start
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Worker ID: ${process.pid} | App listening at http://localhost:${port}`);
    });
});

// Log the number of available CPUs
console.log(`Available CPUs for : ${availableCpus}`);



