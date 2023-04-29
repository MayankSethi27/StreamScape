const Comment=require('../schema/comment_schema');
const Post=require('../schema/post_schema');

module.exports.create=async function(req,res){

   
    //we are creating comment in post(fetching the post by its id as (req.body.post--> which is giving id of post))
   let post=await Post.findById(req.body.post);

   try{
        //checking if that posts exist or not
       if(post){
       let comment=await Comment.create({
            //these are keys to store inside the Comment database
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        });
        post.comments.push(comment);
        //to tell the database to save the post
        post.save();
        comment = await comment.populate('user','name email');
           
                // check if type of request is for AJAX(which is XMLHttp request)
            if(req.xhr){
                return res.status(200).json({
                       data:{
                            comment:comment
                       },
                             message:"Comment Created"
                 });
     
                }
                console.log("comment created sucessfully");
                console.log(comment);
                //pushing comment in that post
                //we are pushing the comment inside the 'comments' array of the the 'posts' schema
               
                
                req.flash('success','comment published!');
                return res.redirect('/');
            }
       
        
        }catch(error){
            console.log('error',error);
            return res.redirect('back');
        }
    }

module.exports.destroy=function(req,res){
    
    Comment.findById(req.params.id,function(err,comment){
        console.log(comment.user);
        console.log(req.user.id);
        if(comment.user==req.user.id){
            let PostId=comment.post;
            comment.remove();

            //updating post after deleting comment from it
            Post.findByIdAndUpdate(PostId,{$pull:{comments:req.params.id}},function(err,post){
                req.flash('success','comment deleted!');
                return res.redirect('back');
            });
        }else{
            req.flash('error',err);
            return res.redirect('back');
        }});
    }