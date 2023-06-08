const { oauthClient } = require("../server/oauth");
const Card = require("../models/card");

const boardId = "64813725360dd9591ac4b5a4";
const listId = "648137401f521efa906d4cca";

const SAVE_CARD_URL = `https://api.trello.com/1/cards`;

const getCards = async (req, res) => {
  try {
    console.log("[services/cards] Fetching Cards");

    const cards = await Card.find();

    console.log("[services/cards] Fetched Cards Successfully");
    res.send(cards);
  } catch (e) {
    console.log("[services/cards] Error while fetching cards");
    console.log(e);
    res.status(500).send();
  }
};

const saveCard = async (req, res) => {
  try {
    console.log("[services/cards] Saving Card");

    const cardName = req.body.name;
    const cardDesc = req.body.desc;

    if (!cardName || !cardDesc) {
      console.log("[services/cards] Missing required params");
      return res.status(400).send({ error: "Missing required params" });
    }

    // const card = new Card({ name: cardName, desc: cardDesc });

    oauthClient.post(
      SAVE_CARD_URL,
      req.accessToken,
      req.accessTokenSecret,
      { name: cardName, desc: cardDesc, idList: listId },
      "application/json",
      async (error, data, response) => {
        if (error) {
          console.log(
            "[services/cards] Error while saving data to the provider"
          );
          return res.status(400).send(error);
        }

        console.log("[services/cards] Saved card using provider api");

        const resData = JSON.parse(data);

        const card = new Card({
          name: cardName,
          desc: cardDesc,
          trelloCardId: resData.id,
          trelloListId: resData.idList,
          trelloBoardId: resData.idBoard,
        });
        await card.save();

        console.log("[services/cards] Saved Card Successfuly");
        res.send();
      }
    );
  } catch (e) {
    console.log("[services/cards] Error while saving card");
    console.log(e);
    res.status(500).send();
  }
};

module.exports = { getCards, saveCard };
