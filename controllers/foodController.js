const foodModel = require("../models/foodModel");

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
            if (!title || !description || !price 
                // || !restaurant
            ) {
                return res.status(500).send({
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
                // restaurant,
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
        console.lohg(error);
        res.status(500).send({
            success:false,
            message:"Error in order api",
            error
        })
        
    }
    
}



module.exports = { orderStatusController, createfoodController ,getAllfoodController}



