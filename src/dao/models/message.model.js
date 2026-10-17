import mongoose from "mongoose";

const messageSchecma = new mongoose.Schema(
{
    user:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
)

export const MessageModel = mongoose.model('messages', messageSchema);
