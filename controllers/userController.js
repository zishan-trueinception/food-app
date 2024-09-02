// GET USER INFORMATION

const userModel = require("../models/userModel")

const getUserController = async (req,res) => {
    try {
        // find user
        const user = await userModel.findById(req.body.id);
        if(!user){
            res.status(500).send({
                success:false,
                message:"User not found"
            })
        }
        // hide password
        user.password = undefined;

        // response send 
        res.status(200).send({
            success:true,
            message:"User found successfully",
            user
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in Getiing User",
            error
        })
        
    }
}

module.exports = { getUserController }