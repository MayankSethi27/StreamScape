const Post=require('../schema/post_schema');

//function to create post in database
module.exports.create=function(req,res){
    console.log(req.user.id);
   Post.create({
    content:req.body.content,
    //we are getting req.body._id from the help of setAuthenticated function and we are just storing the id because it is unique
    //and we can tell that which post belongs to whome
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