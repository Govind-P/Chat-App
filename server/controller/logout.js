export const Logout = async (req, res) => {
    try{
        res.clearCookie("token");
        res.status(200).json({
            message: "User logged out successfully",
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
};