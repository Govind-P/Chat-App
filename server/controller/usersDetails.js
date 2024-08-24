import userModel from "../model/userModel.js"

export const usersDetails=async(req,res)=>{
    try{
        const userId=req.params.id;
        const user=await userModel.findById(userId).select("-password");
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