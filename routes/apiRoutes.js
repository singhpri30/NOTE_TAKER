const fs = require('fs');
const express = require('express');
const router = express.Router();



//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
router.get("/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        res.json(JSON.parse(data));
    });
})

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
router.post("/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let temp = JSON.parse(data);
        console.log(temp)
        temp.push(req.body)
        fs.writeFile('./db/db.json', JSON.stringify(temp), (err) => {
            if (err) throw err;
            res.json('The file has been saved!')
        });
    });
})

//   * DELETE `/api/notes/:id` - Should receive a query paramter containing the id of a note to delete. 
router.delete("/notes/:id", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let temp = JSON.parse(data);
        temp.splice(req.params.id, 1)
        fs.writeFile('./db/db.json', JSON.stringify(temp), (err) => {
            if (err) throw err;
            res.json('The note has been removed!')
        });
    })
})


module.exports = router;








