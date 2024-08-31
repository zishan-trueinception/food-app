const userModel = require("../models/userModel");
const { route } = require("../routes/testRoutes");
const bcrypt = require('bcryptjs');



// Register route
const registerController = async (req,res)=>{
    try {
        const { username, email, password,address, phone } = req.body;

        //validation
        if(!username || !email || !password || !address || !phone){
            return res.status(500).send({
                success:false,
                message:"Please provide all fields"
            });
        };

        // Hashed password

       var salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt);


        // create new user
        const user = await userModel.create({
            username,
            email, 
            password: hashedPassword, 
            address, 
            phone
        });
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
};

// Login route

const loginController = async (req,res)=>{
   try {

    const { email, password } = req.body;
    if(!email || !password){
        return res.status(500).send({
            success:false,
            message:"Please provide email and password"
        });
    };
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(500).send({
            success:false,
            message:"User not found"
        });
    };
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        return res.status(500).send({
            success:false,
            message:"Incorrect password"
        });
    };
    res.status(200).send({
        success:true,
        message:"Login successfully",
        user
    });
  

   } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in Registration API"
    });
}}




module.exports = { registerController , loginController }