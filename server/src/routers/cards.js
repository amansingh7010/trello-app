const express = require("express");
const { getCards, saveCard } = require("../services/cards");

const router = new express.Router();

router.get("/cards", getCards);

router.post("/cards", saveCard);

module.exports = router;
