const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 5000;

const customRequest = (url, res) => {
  request({
    url: url,
    headers: {
      'User-Agent': 'GiantBombAPIIdleGame'
    }
  }).pipe(res);
};

app.get('/api/games', (req, res) => {
  const url = 'https://www.giantbomb.com/api/games/?api_key=24ded5f5870d9f15b4af9faf26e282f8edd770ad&format=json';
  customRequest(url, res);
});

app.get('/api/consoles', (req, res) => {
  const url = 'https://www.giantbomb.com/api/platforms/?api_key=24ded5f5870d9f15b4af9faf26e282f8edd770ad&format=json';
  customRequest(url, res);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
