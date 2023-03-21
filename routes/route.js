const express=require('express');
const router=express.Router();
console.log('router loaded');


const controller=require('../controller/home_controller');

router.get('/',controller.home);
module.exports=router;