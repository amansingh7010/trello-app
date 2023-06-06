const express = require("express");
const { login, callback } = require("../services/auth");

const router = new express.Router();

router.get("/login", login);
router.get("/callback", callback);

module.exports = router;
