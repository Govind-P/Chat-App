import mongoose from "mongoose";


const MessageSchema = mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text:{
        type: String,
        default: ""
    },
    imageUrl:{
        type: String,
        default: ""
    },
    videoUrl:{
        type: String,
        default: ""
    },
    seen:{
        type: Boolean,
        default: false
    }

},{timestamps: true});


const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;