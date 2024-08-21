import userModel from "../model/userModel.js"

export const userData=async(req,res)=>{
    try{
        const user=await userModel.findById(req.userId);
        if(!user){
            throw new Error('User not found');
        }
        res.status(200).json({
            message: 'User data fetched successfully',
            data: user,
            success: true,
            error: false
        });
    }
    catch(error){
        res.status(500).json({
            error: error.message || error,
            success: false,
            error: true
        });
    }
}