const mongoose=require('mongoose');
const env=require('./environment');
console.log(env.db);
 const db=mongoose.connect(env.db,{useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: false} )
.then(()=>{
    console.log('database connected sucessfully');
})
.catch((err)=>{
    console.log('database connection failed',err);
});

module.exports=db;
