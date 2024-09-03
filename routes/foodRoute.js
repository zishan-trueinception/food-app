const express = require("express");
const router = express.Router();
const { orderStatusController, createfoodController } = require("../controllers/foodController");
const  {authMiddleware} = require("../middlewares/authMiddleware");


// Food Route
router.post("/create",authMiddleware,createfoodController);



// ORDER STATUS

router.post("/order-status",authMiddleware,orderStatusController);



module.exports = router