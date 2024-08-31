const userModel = require("../models/userModel");
const { route } = require("../routes/testRoutes");
const bcrypt = require('bcryptjs');



// Register route
const registerController = async (req,res)=>{
    try {
        const { username, email, password, address, phone } = req.body;

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
            message:"Server Error",
        });
    }
};

// // Login route
// const loginController = async (req,res)=>{
//    try{
//         // verify user
//         const {email, password} = req.body
//         if(!email || !password){
//             res.status(500).send({
//                 success:false,
//                 message:"Please provide email and password"
//             })
//         }
//         // check existing user
//         const existingUser = await userModel.find({email,password});
//         if(!existingUser){
//             res.status(500).send({
//                 success:false,
//                 message:"Create an account first"
//             })
//         }
//         // hashed password compare
//         const match = bcrypt.compare(password,existingUser.password);
//         if(!match){
//             res.status(500).send({
//                 success:false,
//                 message:"Wrong email or password"
//             })
//         }
//         res.status(200).send({
//             success:true,
//             message:"Login Successfully"
//         })
//    }catch(error){
//        res.status(500).send({
//            success:false,
//            message:"Error in Login API"
//        })
//    }
// }




module.exports = { registerController , loginController }