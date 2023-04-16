const express=require('express');
const router=express.Router();
const passport=require('passport');

const postcontroller=require('../controller/post_controller');

router.use('/create',passport.checkAuthentication,postcontroller.create);
router.get('/destroy/:id',passport.checkAuthentication,postcontroller.destroy);

module.exports=router;