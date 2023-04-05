const express=require('express');
const app=express();
const port=8000;
const path=require('path');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const cookieParser = require('cookie-parser')

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);

//extract styles and scripts from the subpages into the layout head tag
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
 app.use('/',require('./routes/route'));
// const router=require('./routes/route'); we cannot do this bcz we need to use it by app -also

//setup the view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));



app.listen(port,function(err){
    if(err){
        console.log("Server is not running on port:",err);
        return;
    }
    else{
        console.log("Server is running on port:",port);
    }
});