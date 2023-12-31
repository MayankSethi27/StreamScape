const Comment=require('../schema/comment_schema');
const Post=require('../schema/post_schema');
const CommentMailer=require("../controller/mailers/comments_mailers");
const queue=require('../config/kue');
const commentEmailWorker=require('../workers/comment_email_worker');
const Like=require('../schema/like_schema');

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
        //pushing the 'comment' in comments array of post
        post.comments.push(comment);
        //to tell the database to save the post
        post.save();
        
        await comment.populate('user');
        
        //calling comment_mailer function to send mail when user comment
        // CommentMailer.newComment(comment);
         
        //creating job means sending the comments to the 'email' queue
        let job=queue.create('emails',comment).save(function(err){
            if(err){
                console.log('Error in sending to the queue',err);
                return;
            }
            else{
                console.log('job enqueued',job.id);
            }
        })
           
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
                
                //pushing comment in that post
                //we are pushing the comment inside the 'comments' array of the the 'posts' schema
               
                
                // req.flash('success','comment published!');
                return res.redirect('/');
            }
       
        
        }catch(error){
            console.log('error',error);
            return res.redirect('back');
        }
    }

module.exports.destroy= async function(req,res){
     
   try{
    let comment=await Comment.findById(req.params.id);
        console.log(req.user.id);
        if(comment.user==req.user.id){

            let PostId=comment.post;
            //delete associate likes for this comment
            await Like.deleteMany({likeable:comment,onModel:'Comment'});

            comment.remove();

            //updating post after deleting comment from it
          let post= await Post.findByIdAndUpdate(PostId,{$pull:{comments:req.params.id}});
                
            if(req.xhr){
                
               return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    message:"comment deleted"
                });
            }
            // req.flash('success','comment deleted!');
            return res.redirect('back');

        }else{
            req.flash('no comment found',err);
            return res.redirect('back');
        }}
    catch(err){
        console.log('error',error);
        return;
    }
}