const User=require('../schema/user_schema');
const path=require('path');
const fs=require('fs')

//render the user profile page
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:' User profile',
            profile_user:user
        });
    })
   
}

//render the SignUp page
module.exports.signUp=function(req,res){
    //if user is authenticated(means signed in) then canot ascess signup page and redirect to profile page
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    else{
        return res.render('user_signUp',{
            title:'user_signUp'
        }
        );
    }
   
}

//render the signInpage
module.exports.signIn=function(req,res){
    //if user is authenticated(means signed in) then canot ascess signIn page and redirect to profile page
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    else{
        return res.render('user_signIn',{
            title:'user_signIn'
        });
    }
   
}

//get the signUp data
module.exports.create=function(req,res){
    //first check the password
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in finding the user in signup",err);
        }
        //user not found or not previously created
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("error in creating user",err);
                    return;
                }
                //user created then
                else{
                    return res.redirect('/user/sign-in');
                }
                    
            });
        }
        //if user is already present
        else{
             return res.redirect('back');
        }
  });
    
     }

//signIn and create the session for the user
module.exports.createSession=function(req,res){
    console.log('session-created');
    req.flash('success','Logged In Successfully');
    //directly redirect to home page when logIn
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        else{
            req.flash('success','Logged Out Successfully');
            return res.redirect('/');
        }
    });
    
}

//to update user profile
module.exports.update=async function(req,res){
    // //if profile user is same as logIn user
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         if(err){
    //             console.log('error in updating profile',err);
    //         }
    //         else{
    //             console.log('profile updated sucessfully');
    //             return res.redirect('/');
    //         }
           
    //     });
        
    // }
    // else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('*****MulterError:',err);
                }
                else{
                    console.log(req.file);
                    //updating the user_schema 'Name' and 'email' attribute 
                    //'user' is current user whose profile is being updated
                    user.Name=req.body.Name;
                    user.email=req.body.email;
                    
                    //checking if user also uploaded file(or DP) or not
                    if(req.file){
                        // check if an avatar exists for the user or not! if yes, delete it!
                        //in user.avatar checking if file path is exist in database
                        //(user.avatar is field name in user_schema which reference of the file uploaded)
                        //fs.existsSync() checking if file exist in local storage(diskstorage)
                        if( user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar))){
                        // deleting the avatar
                        //user.avatar is avatar field in user_schema containing the file path
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        // this is saving path of the uploaded file into the avatar field in the user
                        user.avatar = User.avatarPath + '/' + req.file.filename;
                        }
                    }
                        
                    user.save();
                    return res.redirect('back');
                }
            });
        }
        catch(err){
            console.log('Error',err);
            return res.redirect('back');
        }

    }
    else{
         req.flash('error',err);
         return res.status(401).send('Unauthorized');     
                    
          }
}