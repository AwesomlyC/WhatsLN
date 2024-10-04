// Purpose of this file is to set up routes and associate them with controller functions

const express = require("express");
const axios = require("axios");
const router = express.Router();


router.get("/", async (req, res) => {
    axios
        .get("https://api.jikan.moe/v4/manga?type=lightnovel&limit=25&order_by=title&sort=asc")
        .then(function (response) {
            let data = response.data;
            res.json(data);
            // res.send(data);
            // console.log(data.data[0].url);
        }); 
    console.log("--Successfully called Jikan API--");
});


module.exports = router;