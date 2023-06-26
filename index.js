const express=require('express');
const env=require('./config/environment');
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
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
//require mongoStore and argument as session as we want to store session-cookie to the db
const MongoStore=require('connect-mongo');
//library for flash message
const flash=require('connect-flash');
//require flash middleware
const customMware=require('./config/middleware');

//setup the chat server to be used with server.io
const chatServer=require('http').Server(app);
const chatSockets=require('../codeial/config/chat_sockets').chatSockets(chatServer);
//port for chat_socket(observer) server
chatServer.listen(5001);
console.log('chat server is listining on port 5001');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));
//makes the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
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
    //This is the secret key used to encrypt the session identifier (cookie). 
    secret:env.session_cookie_key,
    //it is used for when user has not logIn(session not initialize) so there is no requirement to put extra info a cookie ,so we set it to false
    saveUninitialized:false,
    //when idendity is stabilish or some user info(session data) is stabilish ,do i want to rewrite it when there is no update.so we set it to false
    resave:false,
    cookie:{
        //age of cookie
        maxAge:(1000*60*100)
    },
    //mongoStore is used to store user data(session info)in the mongo database even when session restarts till signOut or cookieAGE
    //so that we do not need to logIn again when server restarts
    store: MongoStore.create({
        //session to intract with mongoose
        mongoUrl:process.env.db,
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
app.use(passport.session());

//we need both above middlewares ,otherwise passport won't be able to use the isAuthenticated() from "express-session" library
//calling setAuthenticatedUser function
app.use(passport.setAuthenticatedUser);

//to use flash library(called it after session middleware because it uses session-cookie)
app.use(flash());
//using custom middleware for flash message
app.use(customMware.setflash);
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
