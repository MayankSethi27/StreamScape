const Post=require('../schema/post_schema');
const Comment=require('../schema/comment_schema');
const Like=require('../schema/like_schema');
const PostMailer=require("../controller/mailers/comments_mailers");
const queue=require('../config/kue');
const postEmailWorker=require('../workers/post_email_worker');

//function to create post in database
module.exports.create= async function(req,res){
    
    try{
  let post=await Post.create({
    
    content:req.body.content,
    user:req.user._id
    //comments:this will be empty now but when we create commrnt we will push it from comment_controller
   });
   await post.populate('user');
    //creating job means sending the comments to the 'email' queue
    let job=queue.create('emails',post).save(function(err){
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
    //populating user bcz to show user name on frontend part as it contains only user_id(for AJAX part)
   await post.populate('user');
     return res.status(200).json({
        data:{
            post:post
        },
        message:"Post Created"
     });
    
   }
//    req.flash('success','Post Published!');
        return res.redirect('back');
}catch(err){
    req.flash('error',err);
    console.log('Error in creating post',err);
    return res.redirect('back');
} 
}
// module.exports.create= function(req,res){
 //we are getting req.user._id from the help of setAuthenticated function and we are just storing the id because it is unique
    //and we can tell that which post belongs to whome
    //we do not write req.body.id as we are not getting user from post form only content. we are getting from setAuthintedUser() about user
    // console.log(req.user.id);
// Post.create({
//  content:req.body.content,
//  //we are getting req.user._id from the help of setAuthenticated function and we are just storing the id because it is unique
//  //and we can tell that which post belongs to whome
//  //we do not write req.body.id as we are not getting user from post form only content. we are getting from setAuthintedUser() about user
//  user:req.user._id
// },function(err,post){
//  if(err){
//      console.log('Error in posting',err);
//      return;
//  }
//  else{
//      console.log('post sucessfully');
//      console.log(post);
//      return res.redirect('back');
//  }
// });
// }



// module.exports.destroy=function(req,res){

//     Post.findById(req.params.id,function(err,post){
//         if(err){
//             console.log("post not found",err);
//         }
//         else{
//             if(post.user==req.user.id){
//                 console.log('post deleted sucessfully');
//                 post.remove();
//                 //deleting comment of all that post
//                 Comment.deleteMany({post:req.params.id},function(err){
//                     return res.redirect('back');
//                 });
//             }
//             else{
//                 return res.redirect('back');
//             }
//         }
//     })
// }

//function to delete post and their comments 
module.exports.destroy=async function(req,res){

    try{
        //let post contains id of that post
   let post=await Post.findById(req.params.id);
        
            if(post.user==req.user.id){
                console.log('post deleted sucessfully');

                //CHANGE::delete the associate likes of post and comments of that post
                await Like.deleteMany({likeable:post, onModel:'Post'});
                await Like.deleteMany({_id:{$in:post.comments}});
                //this post.remove() function is deleting post from database
                post.remove();
                //deleting comment of all that post
               let comment=await Comment.deleteMany({post:req.params.id});

               if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post deleted"
                });
               }
            //    req.flash('success','Post and associated comments deleted!');
               return res.redirect('back');
            }
            else{
                req.flash('error','You cannot delete this post!');
                return res.redirect('back');
            }
        
    }
catch(err){
    req.flash('error',err);
    console.log('Error in removing Post',err);
    return res.redirect('back');
}
}
