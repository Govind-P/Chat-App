import mongoose from 'mongoose';


const ConversationSchema = mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        }
    ]
},{timestamps:true});

const ConversationModel = mongoose.model('Conversation', ConversationSchema);

export default ConversationModel;