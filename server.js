
////////// DEPENDENCIES //////////

const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

// Set up Express to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware for accessing CSS/JS in Public folder
app.use(express.static('public'));




////////// LISTENER //////////

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}!`);
});
