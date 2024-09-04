// RESTURANT CONTROLLER

const restaurantModel = require("../models/restaurantModel")

 // CREATE RESTURANTS CONTROLLER
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

// GET ALL RESTURANTS
const getAllResturantController = async (req, res) => {
    try {
        // find resturant
        const resturants = await restaurantModel.find({})
        // validation
        if(!resturants){
            return res.status(404).send({
                success: false,
                message: "Resturants Not Found"
            })
        }
        res.status(200).send({
            success: true,
            totalCount: resturants.length,
            message: "Resturants Found Successfully",
            resturants
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Resturant API",
            error
        })
    }
}

// GET RESTURANT BY ID

const getResturantByIdController = async (req, res) => {
    try {
        const resturantId = req.params.id
        // validation of resturant Id
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:"Please Provide Resturant Id"
            })
        }
        // find resturant Id
        const resturant = await restaurantModel.findById(resturantId)
        // validation
        if(!resturant){
            return res.status(404).send({
                success: false,
                message: "Resturant Not Found By Id"
            })
        }
        res.status(202).send({
            success: true,
            message: "Resturant Found Successfully By Id",
            resturant
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in Get Resturant API By ID",
            error
        })
    }
}

// DELETE RESTURANT CONTROLLER
const deleteResturantController = async (req, res) => {
    try {
        const resturantDelete = req.params.id
        // validation of resturant Id
        if(!resturantDelete){
            return res.status(404).send({
                success:false,
                message:"Resturnat Not Found, Please Provide Resturant Id",

            })
        }
        const resturant = await restaurantModel.findByIdAndDelete(resturantDelete)
        res.status(200).send({
            success:true,
            message:"Resturant Deleted Successfully",
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in Delete Resturant API",
        })
    }
}

module.exports = { 
    createResturantController,
    getAllResturantController,
    getResturantByIdController,
    deleteResturantController
 }