import userModel from "../model/userModel.js";


export const SearchUser=async(req,res)=>{
    try{
        const search=req.query.search;
        const query = new RegExp(search,"i","g")

        const user = await userModel.find({
            "$or" : [
                { name : query },
                { email : query }
            ]
        }).select("-password")

        res.status(200).json({
            message : 'all user',
            data : user,
            success : true,
            error:false
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
            error:true,
            success:false
        });
    }
    

}