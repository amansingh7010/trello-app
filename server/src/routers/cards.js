const express = require("express");
const {
  getCards,
  saveCard,
  updateCard,
  deleteCard,
} = require("../services/cards");
const auth = require("../middleware/auth");

const router = new express.Router();

router.get("/api/cards", auth, getCards);

router.post("/api/cards", auth, saveCard);

router.put("/api/cards", auth, updateCard);

router.delete("/api/cards", auth, deleteCard);

module.exports = router;
