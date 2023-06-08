const express = require("express");
const {
  getCards,
  saveCard,
  updateCard,
  deleteCard,
} = require("../services/cards");
const auth = require("../middleware/auth");

const router = new express.Router();

/**
 * GET /api/cards
 * Fetch all Cards
 */
router.get("/api/cards", auth, getCards);

/**
 * PUT /api/cards/:id
 * Update Card by ID
 */
router.put("/api/cards/:id", auth, updateCard);

/**
 * POST /api/cards
 * Save a new Card
 */
router.post("/api/cards", auth, saveCard);

/**
 * DELETE /api/cards/:id
 * Delete Card by ID
 */
router.delete("/api/cards/:id", auth, deleteCard);

module.exports = router;
