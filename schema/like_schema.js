const mongoose=require('mongoose');


const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //this defines the id of like object(which is Post or Comment)
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        refPath:'onModel'
    },
    //this field is used to define the type object (post or comment)
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});

let Like=mongoose.model('Like',likeSchema);
module.exports=Like;