
////////// DEPENDENCIES //////////

const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const apiRoutes = require('./Routes/apiRoutes/apiRoutes');
const htmlRoutes = require('./Routes/htmlRoutes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Express to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Middleware for accessing CSS/JS in Public folder
app.use(express.static('public'));

// connect to route folders
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


////////// LISTENER //////////

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}!`);
});
