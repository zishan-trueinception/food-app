const userModel = require("../models/userModel");

const registerController = async (req,res)=>{
    try {
        const { username, email, password,address, phone } = req.body;

        //validation
        if(!username || !email || !password || !address || !phone){
            return res.status(500).send({
                success:false,
                message:"Please provide all fields"
            });
        }


        // create new user
        const user = await userModel.create({username, email, password, address, phone});
         res.status(201).send({
            success:true,
            message:"Successfully Registered",
            user 
        });

        // check existing user
        const existingUser = await userModel.find({email});
        if(existingUser){
            res.status(500).send({
                success:false,
                message:"User already exists"
            });
        };

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Registration API"
        });
    }
}



module.exports = { registerController }