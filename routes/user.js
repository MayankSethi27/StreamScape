const express=require('express');
const router=express.Router();

const userscontroller=require('../controller/users_controller');

router.get('/profile',userscontroller.profile);

module.exports=router;