const express=require('express');
const router=express.Router();
const passport = require("passport");
const chatController=require('../controller/chats_controller');


router.post("/save-chat" , passport.checkAuthentication ,chatController.saveChat);
module.exports = router;