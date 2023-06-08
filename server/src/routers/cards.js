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

router.put("/api/cards/:id", auth, updateCard);

router.post("/api/cards", auth, saveCard);

router.delete("/api/cards/:id", auth, deleteCard);

module.exports = router;
