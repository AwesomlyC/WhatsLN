// Purpose of this file is to set up routes and associate them with controller functions

const express = require("express");
const axios = require("axios");
const router = express.Router();

const JIKAN_URL = 'https://api.jikan.moe/v4'
// Main Page || Home Page
// Display the top 25 Light Novels
router.get("/", async (req, res) => {
    let retrievePage = req.query.page ? req.query.page : 1;
    console.log(retrievePage + " " + req.query.page);
    axios
        .get(JIKAN_URL +
            "/manga?type=lightnovel&limit=25&order_by=title&sort=asc&sfw=true&page=" +
            retrievePage)
        .then(function (response) {
            let data = response.data;
            res.json(data);
        }); 
    console.log("--Successfully Retrieve the top 25 LNs--");
});

// Single Light Novel Page
// Returns data
router.get("/single/:id", (req, res) => {
    let id = req.params.id;

    console.log("Request ID: " + id);
    axios
        .get(JIKAN_URL + `/manga/${id}`)
        .then(function (response) {
            res.send(response.data);
        }).catch(error => {
            console.log("----Error when retrieving info for single ln: " + error);
        });
    console.log("--Successfully retrieve Single LN ID: " + id);
});

// Retrieve recommendation when user is looking at a particular 
// Light Novel/Manga
router.get("/recommendation/:id", (req, res) => {
    let id = req.params.id;
    console.log("------CALLED RECOMMENDATION-------");
    axios.get(JIKAN_URL + `/manga/${id}/recommendations`)
        .then(function (response) {
            res.send(response.data);

        }).catch(error => {
            console.log("----Error when retrieving recommendation for single ln: " + error);
        });
    console.log("--Sucessfully retrieve Single LN Recommendation: " + id);
});


// API to retrieve search results when user is interacting 
// with the search bar
router.get("/search/:title", (req, res) => {
    let searchTitle = req.params.title;
    console.log("-----Called Search Title: " + searchTitle + "------");
    axios.get(JIKAN_URL + `/manga?q=${searchTitle}&type=lightnovel`)
        .then(function (response) {
            res.send(response.data);
        })
    
});
// API to filter out novels/manga based on user choices
// Types: all/light_novel/manga/novel/manhwa/manhua
// Status: all/publishing/complete/hiatus/discontinued/upcoming
// SFW : true/false
router.get('/filter', (req, res) => {
    console.log("-----Called Filter Express Router-------");
    console.log("Parameters: " + req.query);
    console.log("Parameters: " + req.params);
    let type = req.query.type != "all" ? req.query.type : ``;
    let status = req.query.status != "all" ? req.query.status : ``;
    let sfw = req.query.sfw;


    let queryParams = [
        type ? `type=${type}` : '',
        status ? `status=${status}` : '',
        sfw ? `sfw=${sfw}` : ''
      ].filter(Boolean).join('&');
      

    
    console.log(JIKAN_URL + `/manga?${queryParams}`)
    axios
        .get(JIKAN_URL + `/manga?${queryParams}`)
        .then(function (response) {
            res.send(response.data);
            // console.log(response.data)
        })
    // res.send("pass");
});

// Fetch Random Manga Route
router.get('/random/manga', (req, res) => {
    axios
        .get(JIKAN_URL + "/random/manga")
        .then(function (response) {
            res.send("single-ln?id=" + response.data.data.mal_id);
        })
        .catch(error => {
            res.send("error");
    })
})


// Fetch Random Anime Route
router.get('/random/anime', (req, res) => {
    axios
    .get(JIKAN_URL + "/random/anime")
    .then(function (response) {
        res.send("single-ln?id=" + response.data.data.mal_id);
    })
    .catch(error => {
        res.send("error");
})
})

module.exports = router;