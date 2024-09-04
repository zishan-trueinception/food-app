const express = require("express");
const router = express.Router();
const { 
    orderStatusController, 
    createfoodController, 
    getAllfoodController, 
    getSingleFoodController, 
    getFoodbyRestaurantController, 
    updateFoodController,
    deletefoodController} = require("../controllers/foodController");
const  {authMiddleware} = require("../middlewares/authMiddleware");


// Food Create Route !! Post
router.post("/create",authMiddleware,createfoodController);

// Food Get Route !! Get
router.get("/getall",getAllfoodController);

// get Food by ID
router.get("/get/:id",getSingleFoodController);


// get Food by restaurant ID
router.get("/getbyrestaurant/:id",getFoodbyRestaurantController);

// update food
router.put("/update/:id",authMiddleware,updateFoodController);


// Delete food Item
router.delete("/delete/:id",authMiddleware,deletefoodController);




// ORDER STATUS

router.post("/order-status",authMiddleware,orderStatusController);



module.exports = router