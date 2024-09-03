const express = require("express");
const router = express.Router();
const { orderStatusController, createfoodController, getAllfoodController } = require("../controllers/foodController");
const  {authMiddleware} = require("../middlewares/authMiddleware");


// Food Create Route !! Post
router.post("/create",authMiddleware,createfoodController);

// Food Get Route !! Get

router.get("/getall",authMiddleware,getAllfoodController);



// ORDER STATUS

router.post("/order-status",authMiddleware,orderStatusController);



module.exports = router