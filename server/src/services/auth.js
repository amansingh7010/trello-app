const url = require("url");

const { oauthClient, getAuthUrl } = require("../server/oauth");
const OAuthToken = require("../models/oAuthToken");

const login = async (req, res) => {
  try {
    console.log("[services/auth/login] Login started");
    oauthClient.getOAuthRequestToken(
      async (error, token, tokenSecret, results) => {
        if (error) {
          console.log(
            "[services/auth/callback] Error while fetching request token from the provider"
          );
          return res.status(400).send(error);
        }

        const oAuthToken = new OAuthToken({ token, tokenSecret });
        await oAuthToken.save();

        console.log("[services/auth/login] Saved OAuth token in DB");
        res.send({
          authUrl: getAuthUrl(token),
        });
      }
    );
  } catch (e) {
    console.log("[services/auth/login] Error while logging in");
    res.status(500).send();
  }
};

const callback = async (req, res) => {
  try {
    const query = url.parse(req.url, true).query;
    const token = query.oauth_token;
    const verifier = query.oauth_verifier;

    if (!query || !verifier || query === "" || verifier === "") {
      console.log("[services/auth/callback] Missing query params");
      return res.status(400).send({
        error: `Missing query params 'oauth_token' or 'oauth_verifier'`,
      });
    }

    const oAuthToken = await OAuthToken.findOne({ token: token });

    if (!oAuthToken) {
      console.log("[services/auth/callback] OAuth token expired");
      return res.status(401).send({
        error: "OAuth token expired",
      });
    }

    oauthClient.getOAuthAccessToken(
      oAuthToken.token,
      oAuthToken.tokenSecret,
      verifier,
      async (error, accessToken, accessTokenSecret, results) => {
        if (error) {
          console.log(
            "[services/auth/callback] Error while fetching access token from the provider"
          );
          return res.status(400).send(error);
        }

        console.log(
          "[services/auth/callback] Fetched OAuth access token from the provider"
        );

        oAuthToken.accessToken = accessToken;
        oAuthToken.accessTokenSecret = accessTokenSecret;

        await oAuthToken.save();
        console.log(
          "[services/auth/callback] Saved OAuth access token successfully"
        );

        res.send({ token: oAuthToken.token });
      }
    );
  } catch (e) {
    console.log("[services/auth/callback] Error while redirecting");
    res.status(500).send();
  }
};

module.exports = {
  login,
  callback,
};
