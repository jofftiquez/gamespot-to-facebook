# GameSpot to Facebook

Get random articles from GameSpot API and post it to your Facebook Page

## Prerequisites

**Node.js**

Yep, made with Node + Express.

**Yarn**

I like yarn better than npm, so...

**GameSpot API Key**

Acquire by signing up to https://www.gamespot.com/api/

**Facebook Page Access Token**

It would be best to generate a non-expiring access token from facebook graph API.

1. Create a facebook app that corresponds to your facebook page. See https://developers.facebook.com/apps/
2. Using the [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/), generate a **short-lived user token**, with the proper permissions required to manage posts in your page. Take note of that **short-lived user token**. [See this](https://developers.facebook.com/docs/pages/access-tokens#get-a-short-lived-user-access-token).
3. Exchange that **short-lived user token** to a **long-lived user token**. You'd want to use the **long-lived** instead of the **short-lived** because it will only give your page access token a 1 hour expiration, whereas the **long-lived** one will give your page access token a *non-expiring* expiration. [See this](https://developers.facebook.com/docs/pages/access-tokens#get-a-long-lived-user-access-token).
4. Generate a page access token using your **long-lived user token**. [See this](https://developers.facebook.com/docs/pages/access-tokens#get-a-page-access-token).

For facebook access token limitations refer [here](https://developers.facebook.com/docs/pages/access-tokens#limitations).

**User & Password**

This app uses HTTP Basic Authentication, so just prepare a username and password of your choice.

## Getting Started

1. Install dependencies using yarn. 

```bash
yarn
```

2. Copy `.env.example` and create a `.env` file and supply the proper values. The environmental variables should be pretty self-explantory.


3. Start the app.

> Note: If you run the app in the browser it will throw 401, because it requires basic auth, to test the app you can use postman.

```bash
yarn start
```

## Deploy

You can deploy this to heroku or whatever VPS you want, just don't forget to supply the environmental variables.
