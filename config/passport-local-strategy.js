const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../schema/user_schema');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    //email and password to check
    function(email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            if (err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password){
                console.log('Invalid Username/Password');
                //return null error and no user
                return done(null, false);
            }
            //(returning the user with null error )to serialize function
            return done(null, user);
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    //stores the user id in the cookie using express-session middleware
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

//check if user is authenticated(using this function as middleware)
passport.checkAuthentication=function(req,res,next){
    //if user is signIn, then pass on the req to the next function(controller's action)
    //isAuthenticated is inbuilt function
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signIn
    else{
        return res.redirect('/user/sign-in');
    }
}
 //this function is automatically called when we signed In 
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signIn userfrom the session-cookie and we are just sending this to locals for the views
        res.locals.user=req.user;
        //localuser and user are same just to use it in ejs file we pass the req.user
    }
    next();
}


module.exports = passport;