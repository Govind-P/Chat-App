import conversationModel from "../model/conversationModel.js";

export const getConversation=async(userId)=>{
    if(userId){
        const currentUserConversation = await conversationModel.find({
            "$or" : [
                { sender : userId },
                { receiver : userId}
            ]
        }).sort({  updatedAt : -1 }).populate('message').populate('sender').populate('receiver')

        const conversation = currentUserConversation.map((conv)=>{
            const countUnseenMsg = conv?.message?.reduce((preve,curr) => {
                const msgByUserId = curr?.msgByUserId?.toString()

                if(msgByUserId !== userId){
                    return  preve + (curr?.seen ? 0 : 1)
                }else{
                    return preve
                }
             
            },0)
            
            return{
                _id : conv?._id,
                sender : conv?.sender,
                receiver : conv?.receiver,
                unseenMsg : countUnseenMsg,
                lastMsg : conv.message[conv?.message?.length - 1]
            }
        })

        return conversation
    }else{
        return []
    }

}