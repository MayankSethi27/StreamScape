const express=require('express');
const app=express();
const port=8000;
const path=require('path');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const cookieParser = require('cookie-parser')
//use for to require session-cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
//require mongoStore and argument as session as we want to store session-cookie to the db
const MongoStore=require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);

//extract styles and scripts from the subpages into the layout head tag
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//setup the view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//we need take a express-session middleware which takes cockie and encrypts it and store in it
//MongoStore is used to setup the cookie in the db
app.use(session({
     //name of cookie
    name:'codeial',
    //key to encrypt the id
    secret:'blahsomething',
    //it is used for when user has not logIn(session not initialize) so there is no requirement to put extra info a cookie ,so we set it to false
    saveUninitialized:false,
    //when idendity is stabilish or some user info(session data) is stabilish ,do i want to rewrite it when there is no update.so we set it to false
    resave:false,
    cookie:{
        //age of cookie
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        //session to intract with mongoose
        mongoUrl: 'mongodb+srv://mayank:mayank27@cluster0.yx0w0d3.mongodb.net/?retryWrites=true&w=majority',
        // mongooseConnection:db,
        //do i want to remove automatically is disabled
        autoRemove:'disable'
    },
    function(err){
        console.log(err || 'connect-mongoose setup OK');
    })
}));
//we need to tell the app to use passport
app.use(passport.initialize());
//we need to tell the app to use passport to mantain sessions
app.use(passport.session())
//calling setAuthenticatedUser function
app.use(passport.setAuthenticatedUser);
//use express router
app.use('/',require('./routes/route'));
// const router=require('./routes/route'); we cannot do this bcz we need to use it by app -also

app.listen(port,function(err){
    if(err){
        console.log("Server is not running on port:",err);
        return;
    }
    else{
        console.log("Server is running on port:",port);
    }
});