// Purpose of this file is to set up routes and associate them with controller functions
// const pkceChallenge = require('pkce-challenge');
const express = require('express');
const axios = require('axios');
const qs = require('qs');
const session = require('express-session');
const crypto = require('crypto');



const router = express.Router();
const JIKAN_URL = 'https://api.jikan.moe/v4'
// Main Page || Home Page
// Display the top 25 Light Novels
router.get("/", async (req, res) => {
    let retrievePage = req.query.page !== null ? req.query.page : 1;
    console.log(retrievePage + " " + req.query.page);
    axios
        .get(JIKAN_URL +
            "/manga?type=lightnovel&limit=25&order_by=title&sort=asc&sfw=true&page=" +
            retrievePage)
        .then(function (response) {
            let data = response.data;
            console.log("DATA " + data);
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
    let query = req.query.q;


    let queryParams = [
        type ? `type=${type}` : '',
        status ? `status=${status}` : '',
        sfw ? `sfw=${sfw}` : '',
        query ? `q=${query}`: ''
      ].filter(Boolean).join('&');
      

    
    console.log(JIKAN_URL + `/manga?${queryParams}` + " -- " + query);
    axios
        .get(JIKAN_URL + `/manga?${queryParams}`)
        .then(function (response) {
            res.send(response.data);
        })
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
});


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
});

router.get('/test', (req, res) => {
    axios.get(`https://api.myanimelist.net/v2/manga/ranking?ranking_type=all&limit=100`,
        { headers: HEADERS }
    ).then(function (response) {
        res.send(response.data);
    }).catch(error => {
        console.log("Failed: " + error);
        res.status(500).send("Error occurred");
    });
});


router.post('/testoauth', (req, res) => {
    const { authorisation_code, code_verifier } = req.body; // No need to send clientId and clientSecret here, they should come from process.env
    const baseURI = 'https://myanimelist.net/v1/oauth2/token';
    const data = {
        'client_id': process.env.CLIENT_ID, // Ensure these environment variables are set correctly
        'client_secret': process.env.CLIENT_SECRET,
        'code': authorisation_code, // Ensure this code is the one received from the initial request
        // redirect_uri: process.env.REDIRECT_URI, // Must match the initial authorization request
        'code_verifier': code_verifier, // Must match the original code_verifier
        'grant_type': 'authorization_code'

    };
    console.log(code_verifier);
    axios.post(`${baseURI}`,
        qs.stringify(data)
    
    ).then(response => {
        console.log(response);
    }).catch(error => {
        console.error('Error during token exchange:', error.response?.data || error.message);
        console.error('Status Code:', error.response?.status);
    });
});

function getNewCodeVerifier() {
    const verifier = crypto.randomBytes(32).toString('base64url');
    return verifier.slice(0, 128);
}

function getCodeChallenge(codeVerifier) {
    return crypto.createHash('sha256').update(codeVerifier).digest('base64url');
}

router.get('/account', async (req, res) => {
    const redirect_uri = `http://localhst:5000/api/light-novels/callback`
    const codeVerifier = getNewCodeVerifier();
    const codeChallenge = codeVerifier
    const data = {
        codeVerifier: codeVerifier
    }
    console.log(data);
    req.session.codeVerifier = codeVerifier

    const url =
        `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&code_challenge=${codeVerifier.toString()}`
    res.redirect(url);
});

router.get('/callback', async (req, res) => {
    const { code } = req.query;
    const codeVerifier = req.session.codeVerifier;
    const tokenUrl = 'https://myanimelist.net/v1/oauth2/token';
    const data = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        code_verifier: codeVerifier,
        grant_type: 'authorization_code',
    };
    console.log(data);
    try {
        // const response = await fetch(tokenUrl, {
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
        //     body: new URLSearchParams(data).toString()
        // });
        const response = await axios.post(
            'https://myanimelist.net/v1/oauth2/token',
            new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            grant_type: "authorization_code",
            code: code,
            code_verifier: codeVerifier,
            client_secret: process.env.CLIENT_SECRET,
            }),
            )
        console.log(response.data);
        if (!response.ok) {
            // console.log("Fetch error: " + errorData.message)

            // const errorData = await response.json();
            // console.log(response);
            throw new Error("Fetch error: " + response.toString())
        }
        // Store access token in session or database
        // req.session.accessToken = response.data.access_token;

        res.send('Token received and stored! You can now access user data.');
    } catch (error) {
        console.error('Error exchanging token:', error.response?.data || error.message, error.status);
        res.redirect('http://localhost:3000/account')
    }
});
module.exports = router;