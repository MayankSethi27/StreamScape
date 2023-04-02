const mongoose=require('mongoose');
 const db=mongoose.connect('mongodb+srv://mayank:mayank27@cluster0.yx0w0d3.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('database connected sucessfully');
})
.catch((err)=>{
    console.log('database connection failed',err);
});

module.exports=db;
