const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../schema/user_schema');
const env=require('./environment');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:env.google_client_id,
    clientSecret:env.google_client_secret,
    callbackURL:env.google_callback_url
},

function(accessToken,refreshToken,profile,done){
  //find a user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){console.log('error in google strategy-passport',err); return;}
        //console.log(profile);

        if(user){
            //if found set this user as req.user
            //set as req.user means sign in the user
            return done(null,user);
        }else{
            //if not found, create the user and set it as req.user
            User.create({
                Name:profile.displayName,
                email:profile.emails[0].value,
                //crypto is used to create an random password for user sigIn through OAUTH
                //randomBytes(20) means length of password is 20
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){console.log('error in creating in google strategy-passport',err); return;}
                return done(null,user);
            })
        }
    });
}
))

module.exports = passport;

