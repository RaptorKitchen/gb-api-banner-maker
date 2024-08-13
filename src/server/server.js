const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const customRequest = (url, res) => {
  request({
    url: url,
    headers: {
      'User-Agent': 'GiantBombAPITop5CoverMaker'
    }
  }).pipe(res);
};

app.get('/api/search', (req, res) => {
    const query = req.query.query;
    console.log(`Search query: ${query}`); // Debug log

    if (!query) {
        res.status(400).send('Query parameter is missing');
        return;
    }

    const url = `https://www.giantbomb.com/api/search/?api_key=24ded5f5870d9f15b4af9faf26e282f8edd770ad&format=json&query=${query}&resources=game,franchise,character,object,location,person`;
    console.log(`Fetching from GiantBomb API: ${url}`); // Debug log

    customRequest(url, res);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
