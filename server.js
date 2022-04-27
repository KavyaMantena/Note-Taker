
const express = require('express');
const fs = require('fs')
const path = require('path');
let notes = require('./Develop/db/db.json');


const PORT = process.env.PORT || 3001;
const app = express();


// // Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// //Routes for API
//  Get API
app.get('/api/notes', (req, res) => {
  res.json(notes);
})

//POST api/notes should recieve a new note to save on request body and add to db.json file and return the note to the client
app.post('/api/notes', (req, res) => {
  req.body.id = notes.length;
  notes.push(req.body)
  console.log(path.join(__dirname, '../../Develop/db/db.json'));
  fs.writeFileSync(
    path.join(__dirname, './Develop/db/db.json'),
    JSON.stringify(notes, null, 2)
  );
  res.json(req.body);

})

// Deleting notes
app.delete('/api/notes/:id', (req, res) => {
  console.log(req.params);
  notes = notes.filter(note => note.id !== Number(req.params.id))
  fs.writeFileSync(
    path.join(__dirname, './Develop/db/db.json'),
    JSON.stringify(notes)
  );
  res.json(notes)

});

// // HTML Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('/assets/*', (req, res) => {
  console.log(req.path);
  res.sendFile(path.join(__dirname, `./Develop/public/${req.path}`));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
})