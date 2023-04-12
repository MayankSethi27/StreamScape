const express=require('express');
const router=express.Router();

const postcontroller=require('../controller/post_controller');

router.use('/create',postcontroller.create);

module.exports=router;