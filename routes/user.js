const express=require('express');
const router=express.Router();

const userscontroller=require('../controller/users_controller');

router.get('/profile',userscontroller.profile);
router.get('/sign-up',userscontroller.signUp);
router.get('/sign-in',userscontroller.signIn);


module.exports=router;