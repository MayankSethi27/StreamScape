const passport = require('passport');
const JWTStrategy=require('passport-jwt').Strategy;

//this module will help to extract JWT from the header
const ExtractJWT= require('passport-jwt').ExtractJwt;

const User=require('../schema/user_schema');
const env=require('./environment');

let opts={
    //It specifies that the JWT should be extracted from the authorization header as a Bearer token
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
   //secret key that is required to verify the signature of a JSON Web Token (JWT) during the authentication process.
    secretOrKey:env.jwt_secret
}
//---> authentication after generating jwt
//jwtPayLoad contains user info
passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
 
    //fetching the user id from the jwtPayload and checking
    User.findById(jwtPayLoad._id,function(err,user){
        if(err){
            console.log('error',err);
            return;
        }
        //if user found
        if(user){
            return done(null,user);
        }
        //user not found
        else{
            return done(null,false);
        }
    })
}));

module.exports=passport;