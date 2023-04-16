const mongoose=require('mongoose');
// const Post=require('./post_schema');

const commentSchema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        //getting user id from user_schema
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    post:{
        //jab hum comment ko store karvana hai to pata hona chaiye ki kis post ke andar comment ko store karna hai isliye hum post ki id le rahe hain
        //getting post id from post_schema
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true
    }
},{
    timpestamps:true
});

const Comment=mongoose.model('Comment',commentSchema);

module.exports=Comment;