const express=require('express');
const router=express.Router();
console.log('router loaded');


const homecontroller=require('../controller/home_controller');

router.get('/',homecontroller.home);
router.use('/user',require('./user'));
router.use('/posts',require('./post'));
module.exports=router;