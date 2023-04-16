const Post=require('../schema/post_schema');
const Comment=require('../schema/comment_schema');

//function to create post in database
module.exports.create=function(req,res){
    console.log(req.user.id);
   Post.create({
    content:req.body.content,
    //we are getting req.user._id from the help of setAuthenticated function and we are just storing the id because it is unique
    //and we can tell that which post belongs to whome
    //we do not write req.body.id as we are not getting user from post form only content. we are getting from setAuthintedUser() about user
    user:req.user._id
   },function(err,post){
    if(err){
        console.log('Error in posting',err);
        return;
    }
    else{
        console.log('post sucessfully');
        console.log(post);
        return res.redirect('back');
    }
   });
}


module.exports.destroy=function(req,res){
    console.log(req.user.id);
    
    Post.findById(req.params.id,function(err,post){
        if(err){
            console.log("post not found",err);
        }
        else{
            if(post.user==req.user.id){
                console.log('post deleted sucessfully');
                post.remove();
                //deleting comment of all that post
                Comment.deleteMany({post:req.params.id},function(err){
                    return res.redirect('back');
                });
            }
            else{
                return res.redirect('back');
            }
        }
    })
}