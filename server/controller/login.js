import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login=async (req,res) => {
    try{
        const {email,password}=req.body;
        const newEmail=email.toLowerCase();
        const user=await userModel.findOne({email:newEmail});
        if(!user){
            throw new Error('User not found');
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            throw new Error('Invalid credentials');
        }
        const tokenData={
            id:user._id,
            email:user.email,
        };
        const token =await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn: 60*60*8});
        user.password="verified";
        const tokenOption={
            httpOnly: true,
            secure:true,
        }; 
        res.cookie("token",token,tokenOption).status(200).json({
            data:token,
            user:user,
            message : 'User logged in successfully!',
            success:true,
            error:false
        });

    }
    catch(error){
        res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
}