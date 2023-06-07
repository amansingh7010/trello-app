const express = require("express");
const { getCards } = require("../services/cards");

const router = new express.Router();

router.get("/cards", getCards);

module.exports = router;
