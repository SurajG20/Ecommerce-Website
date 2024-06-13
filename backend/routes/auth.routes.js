const express = require("express");

const { login, register } = require("../controllers/auth.controllers");

const router = express.Router();

// POST => /api/auth/register
router.post("/register", register);

// POST => /api/auth/login
router.post("/login", login);

module.exports = router;
