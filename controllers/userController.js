// GET USER INFORMATION

const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs');

const getUserController = async (req,res) => {
    try {
        // find user
        const user = await userModel.findById(req.body.id);
        if(!user){
            return res.status(500).send({
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
        // update user
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
            return res.status(400).send({
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
        return res.status(400).send({
            success: false,
            message: "Error in password update",
            error
        });
    }
};



module.exports = { 
    getUserController, 
    updateUserController,
    updatePasswordController
}