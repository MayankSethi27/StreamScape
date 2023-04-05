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

//we need take a middleware which takes cockie and encrypts it
app.use(session({
     //name of cookie
    name:'codeial',
    //key to encrypt the id
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        //age of cookie
        maxAge:(1000*60*100)
    }
}));
//we need to tell the app to use passport
app.use(passport.initialize());
//we need to tell the app to use passport to mantain sessions
app.use(passport.session())

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