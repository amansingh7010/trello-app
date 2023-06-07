const OAuth = require("oauth").OAuth;

const requestURL = "https://trello.com/1/OAuthGetRequestToken";
const accessURL = "https://trello.com/1/OAuthGetAccessToken";
const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
const appName = "Trello App";
const scope = "read,write,account";
const expiration = "1hour";

const key = process.env.TRELLO_API_KEY;
const secret = process.env.TRELLO_OAUTH_SECRET;
const loginCallback = process.env.REDIRECT_URI;

const oauthClient = new OAuth(
  requestURL,
  accessURL,
  key,
  secret,
  "1.0A",
  loginCallback,
  "HMAC-SHA1"
);

const getAuthUrl = (token) =>
  `${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}`;

module.exports = { oauthClient, getAuthUrl };
