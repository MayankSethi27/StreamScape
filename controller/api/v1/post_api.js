const Post=require('../../../schema/post_schema');
const Comment=require('../../../schema/comment_schema');
module.exports.index=async function(req,res){
   
        let posts=await Post.find({})
           .sort('-createdAt')
           .populate('user')
            .populate({
                path:'comments',
                populate:{
                    path:'user'
                }
            });
            
           

    return res.json(200,{
        message:"Lists of Posts",
        posts:posts
    })
}

module.exports.destroy=async function(req,res){

    try{
   let post=await Post.findById(req.params.id);
        
           if(post.user==req.user.id){
                console.log('post deleted sucessfully');
                //this post.remove() function is deleting post from database
                post.remove();
                //deleting comment of all that post
               let comment=await Comment.deleteMany({post:req.params.id});

               return res.redirect('back');
           }   
           else{
            return res.json(401,{
                message:"You cannot Delete this Post"
            })
        } 
    }
    
catch(err){
    console.log('Error in removing Post',err);
    return res.json(500,{
        message:"Post deleted"
    });
}
}