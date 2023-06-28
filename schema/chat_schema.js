const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    user:{
        //getting user id from another schema 'User'
        type:String,
        required:true
    },
},{
    timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;