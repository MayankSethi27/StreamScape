const express=require('express');
const router=express.Router();
const passport=require('passport');

const postcontroller=require('../controller/post_controller');

// to create the post
router.post('/create',passport.checkAuthentication,postcontroller.create);

// to delete post
router.get('/destroy/:id',passport.checkAuthentication,postcontroller.destroy);

module.exports=router;