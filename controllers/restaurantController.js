// RESTURANT CONTROLLER

const restaurantModel = require("../models/restaurantModel")

 
const createResturantController = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            address
        } = req.body
        // validation
        if(!title || !address){
            return res.status(500).send({
                success: false,
                message:"Please Provide title and address"
            })
        }
        const newResturant = new restaurantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            address
        })
        await newResturant.save()
        res.status(200).send({
            success: true,
            message: "New Resturant Created Successfully",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Resturant API",
            error
        })
    }
}

module.exports = { createResturantController }