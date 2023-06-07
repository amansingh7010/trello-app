const OAuth = require("oauth").OAuth;
const url = require("url");

const requestURL = "https://trello.com/1/OAuthGetRequestToken";
const accessURL = "https://trello.com/1/OAuthGetAccessToken";
const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
const appName = "Trello App";
const scope = "read,write,account";
const expiration = "1hour";

const key = process.env.TRELLO_API_KEY;
const secret = process.env.TRELLO_OAUTH_SECRET;
const loginCallback = process.env.REDIRECT_URI;

const oauth_secrets = {};

const oauth = new OAuth(
  requestURL,
  accessURL,
  key,
  secret,
  "1.0A",
  loginCallback,
  "HMAC-SHA1"
);

const login = (req, res) => {
  console.log("[Auth Service]: Login started");
  oauth.getOAuthRequestToken(function (error, token, tokenSecret, results) {
    console.log(results, token, tokenSecret);

    // store in db
    oauth_secrets[token] = tokenSecret;
    res.send({
      authUrl: `${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}`,
    });
  });
};

const callback = (req, res) => {
  const query = url.parse(req.url, true).query;
  const token = query.oauth_token;
  const tokenSecret = oauth_secrets[token];
  const verifier = query.oauth_verifier;
  oauth.getOAuthAccessToken(
    token,
    tokenSecret,
    verifier,
    (error, accessToken, accessTokenSecret, results) => {
      console.log(accessToken, accessTokenSecret, results);
      // accessToken and accessTokenSecret should be stored
      oauth.getProtectedResource(
        "https://api.trello.com/1/members/me",
        "GET",
        accessToken,
        accessTokenSecret,
        (error, data, response) => {
          // console.log("user data", data);
          res.send(data);
        }
      );
    }
  );
};

module.exports = {
  login,
  callback,
};
