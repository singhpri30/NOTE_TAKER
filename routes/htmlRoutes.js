const path = require("path");
const express = require('express');
const router = express.Router();


//   * GET `/notes` - Should return the `notes.html` file.
router.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//   * GET `*` - Should return the `index.html` file
router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
