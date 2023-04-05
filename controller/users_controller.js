const User=require('../schema/user_schema');
//render the user profile page
module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:'profile'
    });
}

//render the SignUp page
module.exports.signUp=function(req,res){
    return res.render('user_signUp',{
        title:'user_signUp'
    });
}

//render the signInpage
module.exports.signIn=function(req,res){
    return res.render('user_signIn',{
        title:'user_signIn'
    });
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
    return res.redirect('/');
}