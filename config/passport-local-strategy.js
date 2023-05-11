const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../schema/user_schema');


// authentication using passport when we are doing logIn
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback:true
    },
    //email and password to check
    function(req,email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            if (err){
                console.log('Error in finding user --> Passport');
                req.flash('error',err);
                return done(err);
            }

            if (!user || user.password != password){
                console.log('Invalid Username/Password');
                req.flash('error','Invalid Username/Password');
                //return null error and no user found
                return done(null, false);
            }
            //when user found(returning the user with null error )to serialize function
            console.log('user authentication successfully');
            return done(null, user);
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies(eg- putting user id in the cokkie from 'user' object)
passport.serializeUser(function(user, done){
    //stores the user id in the cookie using express-session middleware
    done(null, user.id);
});



// this function is picking id from the session-cookie and converting it into user in the database
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

//check if user is authenticated(using this function as middleware)and it is passedOn to routes
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
        //user 'u' is small as we fetch the User in user in above functions 
    }
    next();
}


module.exports = passport;