const fs = require("fs");
const express = require("express");
const router = express.Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");



//   * GET `/api/notes` - Should read the `db.json` file and send the file to the browser
router.get("/notes", (req, res) => {

    res.sendFile(path.join(__dirname, '../db/db.json'));
})

//   * POST `/api/notes` - Should receive a new note to save on the request body,add id to new note and  add it to the `db.json` file, and then return the new note to the client.
router.post("/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        let existingNotes = JSON.parse(data);
        let newNotes = req.body;
        newNotes.id = uuidv4();
        existingNotes.push(newNotes)
        fs.writeFile("./db/db.json", JSON.stringify(existingNotes), (err) => {
            if (err) throw err;

        });
    });
    res.sendFile(path.join(__dirname, '../db/db.json'));
})

//   * DELETE `/api/notes/:id` - Should receive a query paramter containing the id of a note to delete. 
router.delete("/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        let existingNotes = JSON.parse(data);
        let newNotes = existingNotes.filter(note => {
            return note.id != req.params.id;
        });
        fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err) => {
            if (err) throw err;

        });
    })
    res.sendFile(path.join(__dirname, '../db/db.json'));
})


module.exports = router;








