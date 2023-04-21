const User=require('../schema/user_schema');
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
module.exports.update=function(req,res){
    //if profile user is same as logIn user
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            if(err){
                console.log('error in updating profile',err);
            }
            else{
                console.log('profile updated sucessfully');
                return res.redirect('/');
            }
           
        });
        
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}