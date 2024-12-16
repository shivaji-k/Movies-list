const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const apiKey = 'a1b5f9ec';

app.use(express.static('public'));

app.get('/search', async (req, res) => {
    const searchTerm = req.query.title;
    const url = `http://www.omdbapi.com/?type=movie&apikey=${apiKey}&s=${searchTerm}`;
    try {
        const response = await axios.get(url);
        const movies = response.data.Search || [];
        res.json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching movie data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
 