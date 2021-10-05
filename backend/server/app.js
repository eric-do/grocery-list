const express = require('express')
const cors = require('cors')
const app = express()
const groceries = require('./routes/groceries');
const errorHandler = require('./middleware/errorHandler')

// App level middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/groceries', groceries);

// App level error handling
app.use(errorHandler);

module.exports = app;