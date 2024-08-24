import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';

export const authToken = async (req, res, next) => {
    try{
        const token=req.cookies.token;
        if(!token){
            throw new Error('User not Loggedin');
        }
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.userId=decoded.id;
        next();
    }
    catch(error){
        res.status(401).json({
            message: error.message || error,
            success:false,
            error: true
        });
    }

};

export const authSender = async (req, res, next) => {
    try{
        const token=req.cookies.token;
        if(!token){
            throw new Error('User not Loggedin');
        }
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch(error){
        res.status(401).json({
            message: error.message || error,
            success:false,
            error: true
        });
    }

};