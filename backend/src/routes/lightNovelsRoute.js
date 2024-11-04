// Purpose of this file is to set up routes and associate them with controller functions
// const pkceChallenge = require('pkce-challenge');
const express = require('express');
const axios = require('axios');
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

// -------------------------------------------------------------------------- // 
// OAuth 2.0 Flow
function getNewCodeVerifier() {
    const verifier = crypto.randomBytes(32).toString('base64url');
    return verifier.slice(0, 128);
}

function getCodeChallenge(codeVerifier) {
    return crypto.createHash('sha256').update(codeVerifier).digest('base64url');
}

// For MyAnimeList API
// The codeVerifier is the same as the codeChallenge
router.get('/login', async (req, res) => {
    const codeVerifier = getNewCodeVerifier();
    req.session.codeVerifier = codeVerifier
    const url =
        `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&code_challenge=${codeVerifier.toString()}`
    res.redirect(url);
});

router.get('/callback', async (req, res) => {
    const { code } = req.query;
    const codeVerifier = req.session.codeVerifier;

    await axios.post(
        'https://myanimelist.net/v1/oauth2/token',
        new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            grant_type: "authorization_code",
            code: code,
            code_verifier: codeVerifier,
            client_secret: process.env.CLIENT_SECRET,
        }),).then(response => {
            // Store access token in session or database
            req.session.access_token = response.data.access_token;
            res.redirect('http://localhost:3000/account');
        }).catch(error => {
            console.error('Error exchanging token:', error.response?.data || error.message, error.status);
            res.redirect('http://localhost:3000');
        })
});

// -------------------------------------------------------------------------- // 

router.get('/account/info', async (req, res) => {
    const url = `https://api.myanimelist.net/v2/users/@me`
    const info = {
        login: false,
        redirect: `http://localhost:5000/api/light-novels/login`
    }
    console.log(req.session.access_token);
    if (req.session.access_token) {
        console.log("GETTING AXIOS>GET");
        await axios.get(url, {
            headers: { 'Authorization': `Bearer ${req.session.access_token}` }
        }).then(response => {
            console.log(response.data);
            res.json(response.data);
        }).catch(error => {
            console.log("ERROR: " + error);
        })
    }
    else {
        console.log("not signed in");
        console.log(req.session.access_token);
        res.json(info);
    }
})

router.get('/account/mangalist', async (req, res) => {
    const url = `https://api.myanimelist.net/v2/users/@me/mangalist`

    axios.get(url, {
        headers: { 'Authorization': `Bearer ${req.session.access_token}` }
    }).then(response => {
        console.log(response.data);
        res.json(response.data);
    }).catch(error => {
        console.log("Error: " + error);
    })
});

router.get('/account/animelist', async (req, res) => {
    const url = `https://api.myanimelist.net/v2/users/@me/animelist?limit=100`

    axios.get(url, {
        headers: { 'Authorization': `Bearer ${req.session.access_token}` }
    }).then(response => {
        res.json(response.data);
    }).catch(error => {
        console.log("Error: " + error);
    })
});

// Able to perform update on both anime/manga
// If the anime/manga is not in user list, it will add it instead
router.get('/account/update/:type/:id', async (req, res) => {
    const id = req.params.id;
    let type = req.params.type;
    type = type.charAt(0).toLowerCase() + type.slice(1);        // Lowercase first letter
    const {status, score} = req.query;
    const url = `https://api.myanimelist.net/v2/${type}/${id}/my_list_status`
    console.log(url);
    console.log(req.session.access_token);
    console.log(req.session);
    const data = new URLSearchParams({
        ...(status && { status }),
        ...(score !== '' ? parseInt(score) : 0)
    })
    await axios.put(url, data, {
        headers: { 'Authorization': `Bearer ${req.session.access_token}` }
    }).then(response => {
        console.log(response.data);
    }).catch(error => {
        console.log("Error: " + error);
        res.status(400).json({ error: "Not signed in" });
    });
});

// Delete Manga/Anime from User List
router.get('/account/delete/:type/:id', async (req, res) => {
    const id = req.params.id;
    let type = req.params.type;
    type = type.charAt(0).toLowerCase() + type.slice(1);        // Lowercase first letter

    const url = `https://api.myanimelist.net/v2/${type}/${id}/my_list_status`
    console.log(url);
    console.log(req.session.access_token);
    console.log(req.session);
    await axios.delete(url, {
        headers: { 'Authorization': `Bearer ${req.session.access_token}` }
    }).then(response => {
        console.log(response.data);
    }).catch(error => {
        console.log("Error: " + error);
    })
});


module.exports = router;