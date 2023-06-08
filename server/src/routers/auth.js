const express = require("express");
const { login, callback } = require("../services/auth");

const router = new express.Router();

/**
 * GET /login
 * Initiate Trello OAuth Login
 */
router.get("/login", login);

/**
 * GET /callback
 * Handle Trello callback after successful Authentication
 */
router.get("/callback", callback);

module.exports = router;
