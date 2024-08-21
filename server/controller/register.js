import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import userModel from '../model/userModel.js';


export const register=async (req,res) => {
    try{
        const {name,email,phone,password,profileImage}=req.body;
        const newEmail=email.toLowerCase();
        const existingUser=await userModel.findOne( {$or: [
            { email: newEmail },
            { phone: phone }
          ]});
        if(existingUser){
            throw new Error('User already exists with this email or phone number.');
        }
        const salt=await bcrypt.genSalt();
        const hashedPassword=await bcrypt.hash(password,salt);
        const user=new userModel({name,email:newEmail,phone,password:hashedPassword,profileImage});
        const savedUser=await user.save();
        res.status(201).json({
            message: 'User registered successfully.',
            data: savedUser,
            error: false,
            success: true
        })

    }
    catch(error){
        res.status(500).json({
            message:error.message || error,
            error: true,
            success:false
        });
    }
}
