////////// DEPENDENCIES //////////

const { Router } = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();


////////// API ROUTES //////////

router.get('/api/notes', (req, res) => {
    // create variable from db.json
    let notes = JSON.parse(fs.readFileSync('./data/db.json', 'utf8'));
    // return to client
    return res.json(notes);
});

router.post('/api/notes', (req, res) => {
    let newNote = req.body;
    // create variable from db.json
    let notes = JSON.parse(fs.readFileSync('./data/db.json', 'utf8'));
    // generate unique id with uuid
    newNote.id = uuidv4();
    // push newNote to notes variable
    notes.push(newNote);
    // put notes variable in db.json file
    fs.writeFileSync('./data/db.json', JSON.stringify(notes));
    // return to client
    return res.json(notes);
});

router.delete('./api/notes/:id', (req, res) => {
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

module.exports = router;