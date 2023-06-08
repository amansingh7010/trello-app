const { oauthClient } = require("../server/oauth");
const Card = require("../models/card");
const CARDS = require("../__mocks__/cards.json");

const boardId = "64813725360dd9591ac4b5a4";

const FETCH_CARDS_URL = `https://api.trello.com/1/cards`;

const getCards = async (req, res) => {
  try {
    console.log("[services/card]: Fetching Cards");
    // oauthClient.getProtectedResource(
    //   FETCH_CARDS_URL,
    //   "GET",
    //   req.accessToken,
    //   req.accessTokenSecret,
    //   (error, data, response) => {
    //     if (error) {
    //       throw new Error(error);
    //     }

    //     console.log("[services/dashboard] Fetched cards from the provider");
    //     console.log(data);
    //   }
    // );
    console.log("[services/card]: Fetched Cards Successfully");
    res.send(CARDS);
  } catch (e) {
    console.log("[services/card]: Error while fetching cards");
    console.log(e);
    res.status(500).send();
  }
};

const saveCard = async (req, res) => {
  try {
    console.log("[services/card]: Saving Card");
    console.log(req.body);
    console.log("[services/card]: Saved Card Successfuly");
    res.send();
  } catch (e) {
    console.log("[services/card]: Error while saving card");
    console.log(e);
    res.status(500).send();
  }
};

module.exports = { getCards, saveCard };
