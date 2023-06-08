const express = require("express");

const auth = require("../middleware/auth");
const { getDashboardData } = require("../services/dashboard");

const router = new express.Router();

/**
 * GET /api/dashboard
 * Fetch Dashboard data
 */
router.get("/api/dashboard", auth, getDashboardData);

module.exports = router;
