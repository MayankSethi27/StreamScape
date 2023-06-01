const mongoose=require('mongoose');
// const User = require('./user_schema');
// const Comment=require('./comment_schema');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        //getting user id from another schema 'User'
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    //fetching all the id's of all the comments in this post itself associated with this post
    //we are storing all comments ids inside the post, thats why we take the array of comments as there are many array
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment',
        }
    ],
    likes:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Like'    
    }]
},
{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);

module.exports=Post;