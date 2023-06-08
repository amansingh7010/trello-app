const { oauthClient } = require("../server/oauth");

const getDashboardData = async (req, res) => {
  try {
    console.log("[services/dashboard]: Fetching Dashboard data");
    oauthClient.getProtectedResource(
      "https://api.trello.com/1/members/me",
      "GET",
      req.accessToken,
      req.accessTokenSecret,
      (error, data, response) => {
        if (error) {
          console.log(
            "[services/dashboard] Error while fetching data the provider"
          );
          return res.status(400).send(error);
        }

        console.log("[services/dashboard] Fetched user info from the provider");
        res.send(data);
      }
    );
    console.log("[services/dashboard]: Fetched Dashboard data Successfully");
  } catch (e) {
    console.log("[services/dashboard]: Error while fetching Dashboard data");
    console.log(e);
    res.status(500).send();
  }
};

module.exports = { getDashboardData };
