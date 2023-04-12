const Post=require('../schema/post_schema');

module.exports.home=function(req,res){
    //function to display the posts on home page
    // Post.find({},function(err,posts){
    //     if(err){
    //         console.log('Error in fetching the post',err);
    //         return;
    //     }
    //     else{
    //         console.log('Posts Fetched Sucessfully');
    //         return res.render('home',{
    //             title:"Codeial || home",
    //             post:posts
    //         });
    //     }
    // });

//finding posts from the 'Post' schema(model)
//in the 'user' it contains only the id but by 'populate('user)' function we are fetching the user object of that id which contain whole details of user
    Post.find({}).populate('user').exec(function(err,posts){
        if(err){
            console.log('Error in fetching the post',err);
            return;
        }
        else{
            console.log('Posts Fetched Sucessfully');
            return res.render('home',{
                title:"Codeial || home",
                post:posts
            });
        }
    });
}

