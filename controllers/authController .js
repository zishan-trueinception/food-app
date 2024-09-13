const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");
const { route } = require("../routes/testRoutes");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const nodemailer = require('nodemailer');
const { sendEmail } = require("../utils/mailer");
const { stringGen } = require("../utils/stringGen");



// Register route
const registerController = async (req, res) => {
    try {
      const { username, email, password, address, phone, answer } = req.body;
      const verificationToken = stringGen();
  
      // Validation
      if (!username || !email || !password || !address || !phone || !answer) {
        return res.status(400).send({
          success: false,
          message: "Please provide all fields",
        });
      }
  
      // Check if user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: "User already exists",
        });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

    
  
      // Create new user
      const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        address,
        phone,
        answer,
        isVerified: false,
        verifyToken:verificationToken,
  });


   // Send verification email
   
   const emailSubject = "Verify your email";
   const emailBody = ` 

     Please click on the link below to verify your email

     http://localhost:8080/api/v1/auth/verifyEmail?token=${verificationToken}

     Thank you,

     `;
     await sendEmail(email,emailSubject,emailBody);
      return res.status(201).send({
        success: true,
        message: "Successfully Registered",
        user,
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error in Registration API",
      });
    }
  };


// Login route ....
const loginController = async (req,res)=>{
   try {
    const { email, password } = req.body;
    // Validation
    if(!email || !password){
        return res.status(500).send({
            success:false,
            message:"Please provide email and password"
        });
    };
    //check if user exists
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(500).send({
            success:false,
            message:"User not found"
        });
    };
    // compare password | check user password
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        return res.status(500).send({
            success:false,
            message:"Incorrect password"
        });
    }
    // token 
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});


    // password hide | send response
    user.password = undefined;
    res.status(200).send({
        success:true,
        message:"Login successfully",
        token,
        user
    });
  

   } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in Registration API"
    });
}};

const verifyController = async (req,res)=>{
  const verifyToken = req.query.token;  // Extract token from query parameters

  console.log(verifyToken)

  if (!verifyToken) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {

  
    // Find user by token in the database
    const user = await userModel.findOne({ verifyToken:verifyToken });

    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Token is valid, user found
    res.json({ message: 'User verified successfully', user: user });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const forgotController=async(req,res)=>{
  try {
    const {email}=req.body;
    const verificationToken = stringGen();
  if(!email){
    return res.status(500).send({
        success:false,
        message:"Email is required"
    });
  }
    const emailSubject = "Verify your email";
    const emailBody = `<h1>${verificationToken}</h1>
    http://localhost:8080/api/v1/auth/resetpassword `;
    const user = await userModel.findOne({email});
    sendEmail(email,emailBody,emailSubject);
    if(user){
        user.verifyToken = verificationToken
        user.save()
    }
    if(!user){
        return res.status(500).send({
            success:false,
            message:"User not found"
        });
    }} catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong"
        });
    }
};


// UPDATE USER
const updatepassword = async (req,res) => {
  try {
    const {newpassword,token} = req.body
      // find user
      const user = await userModel.findOne({verifyToken:token});
      console.log(user)
      // validation
      if(!user){
          return res.status(404).send({
              success:false,
              message:"User not found"
          })
      }
      // update user data
      if(newpassword)user.password = newpassword
      // save user
      await user.save()
      res.status(200).send({
          success:true,
          message:"User Updated Successfully",
      })
  } catch (error) {
      res.status(500).send({
          success:"false",
          message:"Error in updating user",
          error
      })
  }
}



module.exports = { registerController , loginController, verifyController,forgotController,updatepassword}