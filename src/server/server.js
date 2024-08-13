const express = require('express');
const path = require('path');
const request = require('request');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

// API route
app.get('/api/search', (req, res) => {
    const query = req.query.query;
    console.log(`Search query: ${query}`);

    if (!query) {
        res.status(400).send('Query parameter is missing');
        return;
    }

    const url = `https://www.giantbomb.com/api/search/?api_key=24ded5f5870d9f15b4af9faf26e282f8edd770ad&format=json&query=${query}&resources=game,franchise,character,object,location,person`;
    console.log(`Fetching from GiantBomb API: ${url}`);

    request({
        url: url,
        headers: {
            'User-Agent': 'GiantBombAPITop5CoverMaker'
        }
    }).pipe(res);
});

// The "catchall" handler: for any request that doesn't match an API route, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
