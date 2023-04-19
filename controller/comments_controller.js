const Comment=require('../schema/comment_schema');
const Post=require('../schema/post_schema');

module.exports.create=function(req,res){
    //we are creating comment in post(fetching the post by its id as (req.body.post--> which is giving id of post))
    Post.findById(req.body.post,function(err,posts){
        //checking if that posts exist or not
       if(posts){
        Comment.create({
            //these are keys to store inside the Comment database
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        },function(err,comment){
            if(err){
                console.log("Error in  creating comment",err);
                return;
            }
            else{
                console.log("comment created sucessfully");
                console.log(comment);
                //pushing comment in that post
                //we are pushing the comment inside the 'comments' array of the the 'posts' schema
                posts.comments.push(comment);
                //to tell the database to save the post
                posts.save();
                return res.redirect('/');
            }
        });
       }
    });
}


module.exports.destroy=function(req,res){
    
    Comment.findById(req.params.id,function(err,comment){
        console.log(comment.user);
        console.log(req.user.id);
        if(comment.user==req.user.id){
            let PostId=comment.post;
            comment.remove();

            Post.findByIdAndUpdate(PostId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}