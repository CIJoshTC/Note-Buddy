const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));

  res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));
    
    newNote.id = Date.now();

    notes.push(newNote);

    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes));

    res.json(newNote);
});
