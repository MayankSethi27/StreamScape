const Post=require('../schema/post_schema');
const User=require('../schema/user_schema');

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
//in the 'user' of 'PostSchema' it contains only the id but by 'populate('user)' function we are fetching the user object of that id which contain whole details of user
    Post.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        if(err){
            console.log('Error in fetching the post',err);
            return;
        }
        else{
            User.find({},function(err,users){
                console.log('Posts Fetched Sucessfully');
                return res.render('home',{
                    title:"Codeial || home",
                    post:posts,
                    all_users:users
                });
            })
            
        }
    });
}

