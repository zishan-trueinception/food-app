// GET USER INFORMATION

const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');

const getUserController = async (req,res) => {
    try {
        // find user
        const user = await userModel.findById(req.body.id);
        if(!user){
            return res.status(404).send({
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
            message:"Error in Fetching User",
            error
        })
        
    }
}

// UPDATE USER
const updateUserController = async (req,res) => {
    try {
        // find user
        const user = await userModel.findById({_id:req.body.id});
        // validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        // update user data
        const {username,address,phone} = req.body
        if(username)user.username = username
        if(address)user.address = address
        if(phone)user.phone = phone
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

// UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById(req.body.id);
        // validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        // get data from user to update old password
        const { oldPassword, newPassword } = req.body;

        // validation
        if (!oldPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                message: "Please provide both old and new passwords"
            });
        }

        // compare old password
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) {
            return res.status(402).send({
                success: false,
                message: "Incorrect old password"
            });
        }

        // Hashing new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password updated successfully"
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in password update",
            error
        });
    }
};

// RESET USER PASSWORD
const resetPasswordController = async (req, res) => {
    try {
        // find user by email new password and answer
        const {email, newPassword, answer} = req.body
        // validation
        if(!email || !newPassword || !answer){
            return res.status(400).send({
                success: false,
                message: "Please provide all fields" 
            })
        }
        const user = await userModel.findOne({email, answer})
        // validation
        if(!user){
            return res.status(400).send({
                success: false,
                message: "User Not Found or Invalid answer" 
            })
        }
        // Hasing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        // update password
        user.password = hashedPassword
        // store in db
        await user.save()
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in Resetting Password",
            error
        })
    }
}

// DELETE PROFILE | ACCOUNT
// user deleted by "_id" in req.body
const deleteUserController = async (req,res) => {
    try {
        // find user
        const user = await userModel.findByIdAndDelete(req.body._id)
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        res.status(200).send({
            success:true,
            message:"User Deleted Successfully",
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in Deleting Api",
        })
    }
};

 // profile upload route
 const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){                       
            cb(null,'uploads') 
        },
        filename:function(req,file,cb){
             cb(null,file.fieldname + "-" + Date.now() + ".jpg");
        }
    })
}).single("image");

// Upload Profile Image
const profileImageController = async (req, res) => {
        try {
            // Get the file path
            const fieldname = req.file.fieldname;
            const filePath = req.file.path;
            const user = await userModel.findById({_id:req.body.id});
            // validation
            if(!user){
                return res.status(404).send({
                    success:false,
                    message:"User not found"
                })
            }
            // update user data
            const {image} = req.body
            const updated= user.profile = `${filePath}`;
            // save user
            await user.save()



            if (!user) {
                return res.status(404).send('User not found');
            }

            res.status(200).send({ 
                message: 'File uploaded successfully', 
                user, 
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    };
       


module.exports = { 
    getUserController, 
    updateUserController,
    updatePasswordController,
    resetPasswordController,
    deleteUserController,
    profileImageController,upload
}