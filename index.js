require('dotenv').config();
const express = require('express');
const basicAuth = require('express-basic-auth');
const cors = require('cors');
const app = express();

const axios = require('axios');
const FB_PAGE_ID = process.env.FB_PAGE_ID;
const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
const GAME_SPOT_API_KEY = process.env.GAME_SPOT_API_KEY;
const PORT = process.env.PORT || 4200;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

app.use(cors({ origin: true }));
app.use(basicAuth({
  users: {
    [USER]: PASSWORD,
  }
}));

const handleError = (e) => {
  if (e.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(e.response.data);
    // console.log(e.response.status);
    const { data } = e.response;
    return data;
  }
  // Something happened in setting up the request that triggered an Error
  return e;
};

// Get list of top stories from hacker news
async function getArticles () {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `https://www.gamespot.com/api/articles/?api_key=${GAME_SPOT_API_KEY}&format=json&sort=publish_date:desc&field_list=authors,title,deck,site_detail_url`,
    });
    return data;
  } catch (e) {
    console.error('Error: getTopStories');
    throw handleError(e);
  }
}

// Publish a link to fb page
async function postToFB (data) {
  try {
    const message = `${data.deck}`;
    const url = encodeURI(`https://graph.facebook.com/${FB_PAGE_ID}/feed?message=${message}&link=${data.site_detail_url}&access_token=${FB_PAGE_ACCESS_TOKEN}`);
    await axios({
      method: 'POST',
      url,
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return data;
  } catch (e) {
    console.error('Error: postToFB');
    throw handleError(e);
  }
}

app.get('/', async (req, res) => {
  try {
    // GET TOP STORIES
    const articles = await getArticles();
    const { results } = articles || {};
    // // GET RANDOM ARTICLE FROM TOP STORIES
    const randomStoryIndex = Math.floor((Math.random() * results.length) + 1);
    const {
      authors,
      title,
      deck,
      site_detail_url
    } = results[randomStoryIndex];
    // // POST TO FACEBOOK PAGE
    await postToFB({ authors, title, deck, site_detail_url });
    res.json({ authors, title, deck, site_detail_url });
  } catch (e) {
    console.error(e);
    res.json(e);
  }
});

app.listen(PORT, () => {
  console.log(`App running in port ${PORT}`);
});
