const restaurantModel = require("../models/restaurantModel");
const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

// create food controller
const createfoodController = async (req, res) => {
    try {
        const {
            title,
             description, 
             price,
             imageUrl, 
             foodTags, 
             category, 
             code, 
             isAvailable,
             restaurant,
             rating 
            } = req.body;
            if (!title || !description || !price || !restaurant) {
                return res.status(404).send({
                    success: false, 
                    message: "Please provide all fields"
                })
            }

            const food = await foodModel.create({
                title,
                description,
                price,
                imageUrl,
                foodTags,
                category,
                code,
                isAvailable,
                restaurant,
                rating
            });
            res.status(200).send({
                success: true,
                message: "Food created successfully",
                food
            })
    } catch (error) {
        console.log(error); 
        res.status(500).send({
            success:false,
            message:"Error in create food api",
            error
        })
    }
    
};


const getAllfoodController = async (req, res) => {
    try {
        const foods = await foodModel.find();
        if(!foods){
            return res.status(404).send({
                success: false,
                message: "No food found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Foods fetched successfully",
            foods
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get food api",
            error
        })
        
    }
    
};

// Get Single food controller

const getSingleFoodController = async (req, res) => {

    try {
        const foodid = req.params.id;
        if(!foodid){
            return res.status(404).send({
                success: false,
                message: "Please provide valid food id"
            });
        }
        const food = await foodModel.findById(foodid); 
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food found with this id"
            });
        }

        res.status(200).send({
            success: true,
            message: "Food fetched successfully",
            food
        })
        
    } catch (error) {

        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get food api",
            error
        })
        
    }
};


// Get Single food controller

const getFoodbyRestaurantController = async (req, res) => {

    try {
        const restaurantid = req.params.id;
        if(!restaurantid){
            return res.status(404).send({
                success: false,
                message: "Please provide valid restaurant id"
            });
        }
        const food = await foodModel.find({restaurant:restaurantid}); 
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food found with this id"
            });
        }

        res.status(200).send({
            success: true,
            message: "Food based on restaurant fetched successfully",
            food
        })
        
    } catch (error) {

        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get food api",
            error
        })
        
    }
};

// Update Food Controller

const updateFoodController = async (req, res) => {

    try {
        const foodid = req.params.id;
        if(!foodid){
            return res.status(404).send({
                success: false,
                message: "Please provide valid food id"
            });
        }
        const food = await foodModel.findById(foodid); 
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food found with this id"
            });
        }
        const {  title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating} = req.body;
            const updatedfood = await foodModel.findByIdAndUpdate(foodid,{
                title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating
            },{new:true});
        res.status(200).send({
            success: true,
            message: "Food updated successfully",
        
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in update food api",
            error
        })
        
    }

};

// Delete food controller

const deletefoodController = async (req, res) => {
    try {
        const foodid = req.params.id;
        if(!foodid){
            return res.status(404).send({
                success: false,
                message: "Please provide valid food id"
            });
        }
         const food = await foodModel.findById(foodid); 
         if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food found with this id"
            })
        }

        const deletefood = await foodModel.findByIdAndDelete(foodid);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food found with this id"
            })
        }
   } catch{
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in delete food api",
        error
    })
   }
}




// Change order status
const orderStatusController = async (req, res) => {
    try {
        const  orderId = req.params.id;
        if(!orderId){
            return res.status(404).send({
                success: false,
                message: "Please provide valid order id"
            })
        };
        const {status} = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        res.status(200).send({
            success: true,
            message: "Order Status Updated",
            
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in order api",
            error
        })
        
    }
    
};
// Order Status controller
const placeOrderController = async (req, res) => {

    try {
        const {cart} = req.body;
        if(!cart){
            return res.status(404).send({
                success: false, 
                message:"Please provide cart and payment details"
            })
        }
        let total = 0;
        // calculate total
        cart.map((i)=>{
            total = total + i.price
        });
        const newOrder = await orderModel({
            foods:cart,
            payment:total,
            buyer:req.body.id
        });
        await newOrder.save();
        res.status(200).send({
            success: true,
            message: "Order placed successfully",
            newOrder
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in order api",
            error
        })
        
    }

}



module.exports = { 
    orderStatusController, 
    createfoodController ,
    getAllfoodController,
    getSingleFoodController,
    getFoodbyRestaurantController,
    updateFoodController,
    deletefoodController,placeOrderController}



