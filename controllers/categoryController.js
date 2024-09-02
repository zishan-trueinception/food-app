const categoryModel = require("../models/categoryModel");
const  route  = require("../routes/categoryRoute");


const catergorycontroller = async (req,res)=>{
   
    try {
        const catergory = await categoryModel.find();
        try {
            res.status(200).send({
                success:"got",
                catergory
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message:"Error while getting catergory",
                error
            })
        }
     
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while getting catergory",
            error
        })
    }
};



module.exports = {catergorycontroller}