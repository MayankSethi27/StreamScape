const express=require('express');
const app=express();
const port=8000;
const path=require('path');

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