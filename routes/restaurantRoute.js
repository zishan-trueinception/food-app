const express = require("express");
const router = express.Router();
const  {authMiddleware} = require("../middlewares/authMiddleware");

// Create Reastaurant Route !! Post
router.post("/create",authMiddleware);

module.exports = router