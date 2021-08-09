
////////// DEPENDENCIES //////////

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Set up Express to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware for accessing CSS/JS in Public folder
app.use(express.static('public'));


////////// API ROUTES //////////

app.get('/api/notes', (req, res) => {
    // create variable from db.json
    let notes = JSON.parse(fs.readFileSync('./data/db.json', 'utf8'));
    // return to client
    return res.json(notes);
});

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    // create variable from db.json
    let notes = JSON.parse(fs.readFileSync('./data/db.json', 'utf8'));
    // push newNote to notes variable
    notes.push(newNote);
    // put notes variable in db.json file
    fs.writeFileSync('./data/db.json', JSON.stringify(notes));
    // return to client
    return res.json(notes);
});

app.delete('./api/notes/:id', (req, res) => {
    // create variable to delete
    let deleteNote = req.params.id;
    // create variable from db.json
    let notes = JSON.parse(fs.readFileSync('./data/db.json', 'utf8'));
    // filter by id to make newNotes array
    let newNotes = notes.filter(note => note.id !== deleteNote);
    // put newNotes array into db.json
    fs.writeFileSync('./data/db.json', JSON.stringify(newNotes));
    // return to client
    return res.json(newNotes);
});


////////// HTML ROUTES //////////

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



////////// LISTENER //////////

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}!`);
});
