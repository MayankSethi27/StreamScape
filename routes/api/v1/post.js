const express=require('express');
const router=express.Router();
const passport=require('passport');
const PostApi=require('../../../controller/api/v1/post_api');

router.get('/',PostApi.index);

router.delete('/:id',passport.authenticate('jwt',{session:'false'}),PostApi.destroy);




module.exports=router;