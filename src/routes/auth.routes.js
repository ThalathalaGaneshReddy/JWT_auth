const express = require("express");
const {
  Register,
  Login,
  RefreshToken,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/refreshToken", RefreshToken);

module.exports = router;
