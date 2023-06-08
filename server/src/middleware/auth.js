const OAuthToken = require("../models/oAuthToken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const oAuthToken = await OAuthToken.findOne({ token: token });

    if (!oAuthToken?.accessToken) {
      throw new Error();
    }

    req.accessToken = oAuthToken.accessToken;
    req.accessTokenSecret = oAuthToken.accessTokenSecret;

    next();
  } catch (e) {
    console.log("[middleware/auth] Token could not be verified");
    res.status(401).send();
  }
};

module.exports = auth;
