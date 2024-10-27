// Purpose is the main entry point for the backend application


const express = require('express');
const cors = require('cors')
const lightNovelsRoute = require('./routes/lightNovelsRoute');

const app = express();
const PORT = process.env.PORT || 5000;    // What port to listen to

// Middleware
app.use(express.json());    // To Parse JSON payloads
app.use(cors());

// API routes
// This will set up the api endpoint to be localhost:3000/api/light-novels
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/api/light-novels', lightNovelsRoute);

// GET/POST/PUT/DELETE are called via app.get/post/put/delete function calls
// app.get(ENDPOINT, (Request, Response))
// Request -->  contains information about HTTP method, headers, request body
// Response --> Define information that we want to send
app.get('/', (req, res) => {
  res.send(`
    <b>welcome to the API</b>   
    </br> <a href="http://localhost:5000/api/light-novels">Go to API</a>
    </br>
    <a href="http://localhost:5000/api/light-novels/18072">Testing Single Page on ID: 18072</a>
    `)
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server/BACKEND running on port ${PORT}`);
});
