const express = require("express");
const { getCards, saveCard } = require("../services/cards");

const router = new express.Router();

router.get("/api/cards", getCards);

router.post("/api/cards", saveCard);

module.exports = router;
