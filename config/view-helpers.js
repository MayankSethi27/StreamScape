const env=require('./environment');
const fs=require('fs');
const path=require('path');

module.exports=(app)=>{
    app.locals.assetPath=function(filePath){
        console.log(filePath);
        console.log('/'+ JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath],'hdjydh');
        if(env.name=='development'){
           return filePath
        }
        else{
            return '/'+ JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];
        }
    }
}