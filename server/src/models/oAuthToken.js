const mongoose = require("mongoose");

const oAuthSchema = new mongoose.Schema(
  {
    token: {
      type: String,
    },
    tokenSecret: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    accessTokenSecret: {
      type: String,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: "1h" }, // delete the token in 1 hour
    },
  },
  { timestamps: true }
);

const OAuthToken = mongoose.model("OAuthToken", oAuthSchema);

module.exports = OAuthToken;
