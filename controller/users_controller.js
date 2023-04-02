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
    //TODO Later
}

//signIn and create the session for the user
module.exports.createSession=function(req,res){
    //TODO later
}