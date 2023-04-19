const express=require('express');
const router=express.Router();
const passport=require('passport');

const userscontroller=require('../controller/users_controller');

//to render profile page
router.get('/profile/:id',passport.checkAuthentication,userscontroller.profile);

//to render signup page
router.get('/sign-up',userscontroller.signUp);

//to render singnIn page
router.get('/sign-in',userscontroller.signIn);

//to create the user by calling create function
router.post('/create',userscontroller.create);

//to create session
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'},
),userscontroller.createSession);

//to log Out from session
router.get('/sign-out',userscontroller.destroySession);

//to update user profile
router.post('/update/:id',passport.checkAuthentication,userscontroller.update);

module.exports=router;