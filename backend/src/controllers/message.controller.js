import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res)=>{
    try{
        const loggedInUserId = req.user._id;
        const filterdUser = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filterdUser)
    }catch(error){
        console.log("error in get user for side bare", error.message);
        res.status(500).json({error:"internal server error"});
    }
};

export const getMessages = async (req, res) =>{
    try{
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    }catch(error){
        console.log("error in get message controller",error.message)
    }
};

export const sendMessage = async (req, res) =>{
try{
    const {text, image} = req.body;
    const {id: receiverId} = req.params;
    const senderId = req.user._id;

    let imagUrl;
    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image);
        imagUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imagUrl,
    });

    await newMessage.save();

    res.status(200).json(newMessage)

}catch(error){
    console.log("error in senmessage", error.message)
}
};