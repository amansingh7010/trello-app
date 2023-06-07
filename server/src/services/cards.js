const CARDS = require("../__mocks__/cards.json");

const getCards = async (req, res) => {
  try {
    console.log("[Cards Service]: Fetching Cards");
    res.send(CARDS);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

module.exports = { getCards };
