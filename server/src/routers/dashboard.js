const express = require("express");

const auth = require("../middleware/auth");
const { getDashboardData } = require("../services/dashboard");

const router = new express.Router();

router.get("/api/dashboard", auth, getDashboardData);

module.exports = router;
