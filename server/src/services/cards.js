const CARDS = require("../__mocks__/cards.json");

const getCards = async (req, res) => {
  try {
    console.log("[services/card]: Fetching Cards");
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
