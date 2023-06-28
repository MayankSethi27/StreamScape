const mongoose=require('mongoose');
const env=require('./environment');
 const db=mongoose.connect(env.db)
.then(()=>{
    console.log('database connected sucessfully');
})
.catch((err)=>{
    console.log('database connection failed',err);
});

module.exports=db;
