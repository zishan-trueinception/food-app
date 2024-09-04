const categoryModel = require("../models/categoryModel");
const  route  = require("../routes/categoryRoute");

// create category controller route model
const createCatergoryController = async (req,res)=>{
    try {
        const { title, imageUrl } = req.body
        // validation
        if(!title){
            return res.status(500).send({
                success:false,
                message:"Please Provide title"
            })
        }
        // create new category
        const newCategory = new categoryModel({ title, imageUrl })
        await newCategory.save();
        res.status(200).send({
            success:true,
            message:"Category Created Successfully",
            newCategory
        });
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error while creating catergory",
            error
        })
    }
}

// GET ALL CATEGORY ROUTE | GET
const getAllCatController = async (req,res)=>{
    try {
        const categories = await categoryModel.find({})
        // validation
        if(!categories){
            return res.status(404).send({
                success:false,
                message:"No category found"
            })
        }
        res.status(200).send({
            success:true,
            totalCategories:categories.length,
            message:"Categories found successfully",
            categories
        })
    } catch (error) {
        res.status(500).send({
            success:true,
            message:"Error in Get Category API",
            error
        })
    }
}

// UPDATE CATEGORY ROUTE | PUT
const updateCatController = async (req,res)=>{
    try {
        const {id} = req.params
        const {title,imageUrl} = req.body
        const updatedCategory = await categoryModel.findByIdAndUpdate(id,{title,imageUrl}, {new:true})
        if(!updatedCategory){
            return res.status(404).send({
                success:false,
                message:"No category found with this Id"
            })
        }
        res.status(200).send({
            success:true,
            message:"Category Updated Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in updating category",
            error
        })
    }
}

// DELETE CATEGORY ROUTE | DELETE
const deleteCatController = async (req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(404).send({
                success:false,
                message:"Id is required"
            })
        }
        const category = await categoryModel.find({id})
        if(!category){
            return res.status(404).send({
                success:false,
                message:"Category Not Found"
            })
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Category Deleted Successfully"
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in Deleting Category",
        })
    }
}


module.exports = {
    createCatergoryController,
    getAllCatController,
    updateCatController,
    deleteCatController

}