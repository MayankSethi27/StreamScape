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

//to create session(first it will authenticate and then create-session) OR logIn
//When a request reaches this middleware, it triggers the local authentication strategy
router.post('/create-session', passport.authenticate(
    //'local' indicates that the authentication strategy being used is the local strategy.
    'local',
    //if authentication fails then redirect to signIn page
    {failureRedirect:'/user/sign-in'},
),userscontroller.createSession);

//to log Out from session
router.get('/sign-out',userscontroller.destroySession);

//to update user profile
router.post('/update/:id',passport.checkAuthentication,userscontroller.update);

module.exports=router;