const mongoose=require('mongoose');
const User = require('./user_schema');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        //getting user id from another schema 'User'
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
},
{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);

module.exports=Post;