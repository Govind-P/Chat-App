import express from 'express';
import {Server} from 'socket.io';
import http from 'http';
import {GetUserDetails} from '../helper/GetUserDetailS.js';
import userModel from '../model/userModel.js';
import messageModel from '../model/messageModel.js';
import conversationModel from '../model/conversationModel.js';
import {getConversation} from '../helper/getConversation.js';

export const app = express();

export const server = http.createServer(app);
const io=new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

//online User
const onlineUser=new Set();

io.on('connection',async(socket)=>{
    const token=socket.handshake.auth.token;
    const user=await GetUserDetails(token);
    //create a room
    socket.join(user?._id.toString());
    onlineUser.add(user?._id.toString());

    //online user details
    io.emit('onlineUser',Array.from(onlineUser));

    socket.on('message-page',async(id)=>{
        console.log(id);
        const receiverDetails=await userModel.findById(id).select("-password");
        const payload={
            _id: receiverDetails._id,
            name: receiverDetails.name,
            email: receiverDetails.email,
            profileImage: receiverDetails.profileImage,
            online:onlineUser.has(id)
        }
        socket.emit('receiverDetails',payload);
        const getConversationMessage=await conversationModel.findOne({
            "$or":[
                {sender:user?._id, receiver:id},
                {sender:id, receiver:user?._id}
            ]
        }).populate('message').sort({updatedAt:-1});
        socket.emit('messages',getConversationMessage?.message || [])
    })

    socket.on('send-message',async(data)=>{
        let conversation=await conversationModel.findOne({
            "$or":[
                {sender:data.sender, receiver:data.receiver},
                {sender:data.receiver, receiver:data.sender}
            ]
        })
        if(!conversation){
            const newConversation=new conversationModel({
                sender:data.sender,
                receiver:data.receiver
            })
            conversation=await newConversation.save();
        }
        const newMessage=new messageModel({
            sender:data.sender,
            text:data.text,
            videoUrl:data.videoUrl,
            imageUrl:data.imageUrl,
        });
        const savedMessage=await newMessage.save();
        const updateConversation=await conversationModel.updateOne({_id:conversation?._id},{
            "$push":{message:savedMessage._id}
        })
        const getConversationMessage=await conversationModel.findOne({
            "$or":[
                {sender:data.sender, receiver:data.receiver},
                {sender:data.receiver, receiver:data.sender}
            ]
        }).populate('message').sort({updatedAt:-1});

        io.to(data?.sender).emit('messages',getConversationMessage.message || []);
        io.to(data?.receiver).emit('messages',getConversationMessage.message || []);

        const conversationSender = await getConversation(data?.sender)
        const conversationReceiver = await getConversation(data?.receiver)

        io.to(data?.sender).emit('conversation',conversationSender)
        io.to(data?.receiver).emit('conversation',conversationReceiver)
    })

    socket.on('sidebar',async(currentUserId)=>{
        const conversation=await getConversation(currentUserId);
        socket.emit('conversation',conversation)
    })

    socket.on('seen',async(msgByUserId)=>{
        console.log('seen',msgByUserId)
        let conversation = await conversationModel.findOne({
            "$or" : [
                { sender : user?._id, receiver : msgByUserId },
                { sender : msgByUserId, receiver :  user?._id}
            ]
        })

        const conversationMessageId = conversation?.message || []

        const updateMessages  = await messageModel.updateMany(
            { _id : { "$in" : conversationMessageId }, sender: msgByUserId },
            { "$set" : { seen : true }}
        )

        //send conversation
        const conversationSender = await getConversation(user?._id?.toString())
        const conversationReceiver = await getConversation(msgByUserId)

        io.to(user?._id?.toString()).emit('conversation',conversationSender)
        io.to(msgByUserId).emit('conversation',conversationReceiver)
    })




    socket.on('disconnect',()=>{
        onlineUser.delete(user?._id.toString());
        io.emit('onlineUser',Array.from(onlineUser));
        console.log('User disconnected',socket.id);
    })
})

