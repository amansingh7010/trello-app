const express = require("express");
const { getCards, saveCard } = require("../services/cards");
const auth = require("../middleware/auth");

const router = new express.Router();

router.get("/api/cards", auth, getCards);

router.post("/api/cards", auth, saveCard);

module.exports = router;
