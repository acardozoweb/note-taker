////////// DEPENDENCIES //////////

const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const util = require('util');


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

////////// API ROUTES //////////

router.get('/notes', async (req, res) => {
    //creates variable from db.json file
    let notes = await readFileAsync('./Data/db.json', 'utf8');
    console.log('notes', notes);
    console.log('notesType', typeOf(notes));
    //return notes to client
    return res.json(notes);
});

router.post('/notes', (req, res) => {
    let newNote = req.body;
    //generate unique id with uuid package
    newNote.id = uuidv4();
    //create variable from db.json file
    let notes = JSON.parse(fs.readFileSync('./Data/db.json', 'utf8'));
    //push newNote to notes variable 
    notes.push(newNote);
    //write notes variable to db.json file
    fs.writeFileSync('./Data/db.json', JSON.stringify(notes));
    //return notes to client
    return res.json(notes);
});

router.delete('/notes/:id', (req, res) => {
    //creates variable from file to delete
    let deleteNote = req.params.id;
    //creates variable from db.json file
    let notes = JSON.parse(fs.readFileSync('./Data/db.json', 'utf8'));
    //removes/filters deleteFile from notes
    let newNotes = notes.filter(file => file.id !== deleteNote);
    //write notes variable to db.json file
    fs.writeFileSync('./Data/db.json', JSON.stringify(newNotes));
    //return notes to client
    return res.json(newNotes);
});

module.exports = router;