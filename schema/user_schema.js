const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH= path.join('/uploads/users/avatars');

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    //this field has the reference of the 'avatars' folder in which uploaded file is store
    avatar:{
        type:String
    }
   
},{
    timestamps:true
});

//multer.diskStorage() is a function which tells multer that disk storage(local storage) will be used to store the files
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //'path.join()' connecting current directory with avatarpath
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });

  //static functions:-

  //uploadedAvatar function tells that where the uploaded file will be stored
  //.single('avatar')means only one file can be uploaded for the field ‘avatar’ of the users schema, i.e. one user can upload only one avatar
  userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');

  //avatarPath function makes AVATAR_PATH public
  userSchema.statics.avatarPath=AVATAR_PATH;
  


const User=mongoose.model('User',userSchema);
module.exports=User;