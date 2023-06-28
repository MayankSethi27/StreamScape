const Post=require('../schema/post_schema');
const Comment=require('../schema/comment_schema');
const Like=require('../schema/like_schema');


module.exports.togglelike=async function(req,res){
    try{
        //likes/toggle/?id=abcd/type=post
        let likeable;
        let deleted=false;

        if(req.query.type=='Post'){
            likeable=await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable=await Comment.findById(req.query.id).populate('likes');
        }

        //check if like already exists
        let existingLike=await Like.findOne({
            user:req.user._id,
            likeable:req.query.id,
            onModel:req.query.type
        });

        //if like already exist then delete it
        if(existingLike){
          likeable.likes.pull(existingLike._id);
          likeable.save();

          existingLike.remove();
          deleted=true;
        }
        else{
            
            let newLike=await Like.create({
                user:req.user._id,
                onModel:req.query.type,
                likeable:req.query.id
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.json(200,{
            message:'Request Successful',
            data:{
                deleted:deleted
            }
        })
    }
    catch(err){
        console.log('error',err);
        returnres.status(500).json('Request Unauthorized');

    }
}
