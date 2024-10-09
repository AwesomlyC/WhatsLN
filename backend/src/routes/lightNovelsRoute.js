// Purpose of this file is to set up routes and associate them with controller functions

const express = require("express");
const axios = require("axios");
const router = express.Router();

// Main Page || Home Page
// Display the top 25 Light Novels
router.get("/", async (req, res) => {
    axios
        .get("https://api.jikan.moe/v4/manga?type=lightnovel&limit=25&order_by=title&sort=asc")
        .then(function (response) {
            let data = response.data;
            res.json(data);
        }); 
    console.log("--Successfully Retrieve the top 25 LNs--");
});

// Single Light Novel Page
router.get("/:id", (req, res) => {
    let id = req.params.id;

    console.log("Request ID: " + id);
    axios
        .get(`https://api.jikan.moe/v4/manga/${id}`)
        .then(function (response) {
            res.send(response.data);
        }).catch(error => {
            console.log("----Error when retrieving info for single ln: " + error);
        });
    console.log("--Successfully retrieve Single LN ID: " + id);
});

router.get("/recommendation/:id", (req, res) => {
    let id = req.params.id;
    console.log("------CALLED RECOMMENDATION-------");
    axios.get(`https://api.jikan.moe/v4/manga/${id}/recommendations`)
        .then(function (response) {
            res.send(response.data);

        }).catch(error => {
            console.log("----Error when retrieving recommendation for single ln: " + error);
        });
    console.log("--Sucessfully retrieve Single LN Recommendation: " + id);
})
module.exports = router;