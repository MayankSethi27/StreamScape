const Post=require('../schema/post_schema');
const User=require('../schema/user_schema');
const friendships=require('../schema/friendship_schema');

//this function is working when we are reloading the page(for frontend part)
module.exports.home=async function(req,res){
//finding posts from the 'Post' schema(model)
//in the 'user' of 'PostSchema' it contains only the id but by 'populate('user)' function we are fetching the user object of that id which contain whole details of user
    // Post.find({}).populate('user')
    // .populate({
    //     path:'comments',
    //     populate:{
    //         path:'user'
    //     }
    // })
    // .exec(function(err,posts){
    //     if(err){
    //         console.log('Error in fetching the post',err);
    //         return;
    //     }
    //     else{
        //finding all users
    //         User.find({},function(err,users){
    //             console.log('Posts Fetched Sucessfully');
    //             return res.render('home',{
    //                 title:"StreamScape || home",
    //                 post:posts,
    //                 all_users:users
    //             });
    //         })
            
    //     }
    // });
    
    //finding post and user when reloading page(or opening StreamScape for first time during logIn)
try{
let posts=await Post.find({})

   //sorting(arranging) the post in sequence with help of time
   .sort('-createdAt')
   //we are populating bcz post_schema contains id of user which will show id in frontend part. so to show name of the user we need to populate user which is inside post_schema
   .populate('user')
   //this populate is for comments and their likes(of Post)
    .populate({
        path:'comments',
        populate:{
            path:'user'
        },
        populate:{
            path:'likes'
        }
    })
    //this populate is for likes in Post object
    .populate('likes')
    
    console.log("post frontend part when logIN");
    let users=await  User.find({});

    let user;
    if (req.user) {
      user = await User.findById(req.user._id)
        .populate({
          path: "friends",
          populate: {
            path: "to_user",
          },
        });
        console.log(req.user._id,'742696294');
    }
console.log(user,'1234');


    //we sending the details to home.ejs file 
        return res.render('home',{
            //these are details
            title:"StreamScape || home",
            post:posts,
            all_users:users,
             user:user
            
        });
    
    
    }catch(err){
          console.log('Error in fetching post',err);
          return;
      }
    }