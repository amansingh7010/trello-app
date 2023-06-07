const CARDS = require("../__mocks__/cards.json");

const getCards = async (req, res) => {
  try {
    console.log("[Cards Service]: Fetching Cards");
    console.log("[Cards Service]: Fetched Cards Successfully");
    res.send(CARDS);
  } catch (e) {
    console.log("[Cards Service]: Error while fetching cards");
    console.log(e);
    res.status(500).send();
  }
};

const saveCard = async (req, res) => {
  try {
    console.log("[Cards Service]: Saving Card");
    console.log(req.body);
    console.log("[Cards Service]: Saved Card Successfuly");
    res.send();
  } catch (e) {
    console.log("[Cards Service]: Error while saving card");
    console.log(e);
    res.status(500).send();
  }
};

module.exports = { getCards, saveCard };
