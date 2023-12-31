const express=require('express');
const router=express.Router();
console.log('router loaded');


const homecontroller=require('../controller/home_controller');

//to get render homePage
router.get('/',homecontroller.home);

//to go to user router for further routing
router.use('/user',require('./user'));

//to go to post router for further routing
router.use('/posts',require('./post'));

//to go to comment router for further routing
router.use('/comments',require('./comments'));

router.use('/likes',require('./likes'));

router.use("/auth" , require("./auth"));

router.use('/api',require('./api/index'));

router.use('/friends',require('./friends'));

module.exports=router;