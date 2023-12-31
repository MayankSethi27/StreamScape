const User = require('../schema/user_schema');
const AccessToken = require('../schema/accessToken_schema');
const resetPasswordMailer = require('../controller/mailers/resetPassword_mailers');
const crypto = require('crypto');
const ejs=require('ejs');

module.exports.auth = function(request , response){

    return response.render('verify_email' , {
        title: "StreamScape | Verify",
    });
}

module.exports.verifyEmail = async function(request , response){


    let user = await User.findOne({email : request.body.email});

    //console.log(user , request.body)
    if(user){

        let token = crypto.randomBytes(20).toString("hex");
        let accessToken = await AccessToken.create({
           user : user,
           token :  token,
           isValid : true
        });

        resetPasswordMailer.resetPassword(accessToken);

        return response.render('account_verified' , {
            title: "StreamScape | Account Verified",
        });
    }else{
        request.flash("error", "Account does not exist with this email");
        return response.redirect('back');
    }
}

module.exports.resetPassword = async function(request , response){
    
    let accessToken = await AccessToken.findOne({token : request.query.accessToken});
    console.log(accessToken ,'AccessToken' )
    if(accessToken){
        if(accessToken.isValid){
            return response.render('reset_password' , {
                title : 'StreamScape | Reset Password',
                accessToken : accessToken.token
            })
        }
    }

    request.flash('error' , 'Token is Expired ! Pls regenerate it.');
    return response.redirect('/auth');
}

module.exports.reset = async function(request , response){
    console.log( request.query)
    let accessToken = await AccessToken.findOne({token : request.query.accessToken});
    console.log(accessToken ,'AccessToken' )
    if(accessToken){
        console.log('AccessToken Present' )
        if(accessToken.isValid){
            console.log('AccessToken is valid' )
            accessToken.isValid = false;
            if(request.body.password == request.body.confirm_password){
                console.log('Password  matchedd' )
                let user = await User.findById(accessToken.user);
                if(user){
                    console.log('User found' , user )
                    user.password = request.body.password;
                    user.confirm_password = request.body.confirm_password;
                    accessToken.save();
                    user.save();
                    console.log('Password changed' , user )
                    request.flash('success' , 'Password Changed');
                    return response.redirect('/user/sign-in');
                }
            }else{
                request.flash('error' , 'Password didnt matched');
                return response.redirect('back');
            }
            
           
        }
    }

    request.flash('error' , 'Token is Expired ! Pls regenerate it.');
    return response.redirect('/auth');
}