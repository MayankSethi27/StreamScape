const Users = require("../schema/user_schema");
const Friendships = require("../schema/friendship_schema");



module.exports.addFriend = async function(req , res){


    let existingFriendship = await Friendships.findOne({
        from_user : req.user,
        to_user : req.query.id,
    });

    let toUser = await Users.findById(req.user);
    let fromUser = await Users.findById(req.query.id);

    let deleted = false;

    if(existingFriendship){
        toUser.friends.pull(existingFriendship._id);
        fromUser.friends.pull(existingFriendship._id);
        toUser.save();
        fromUser.save();
        existingFriendship.remove();
        deleted = true;
        removeFriend = true;
        console.log('friendship removed');
    }else{
        let friendship = await Friendships.create({
            to_user : req.query.id,
            from_user : req.user._id
        });

        toUser.friends.push(friendship);
        fromUser.friends.push(friendship);
        toUser.save();
        fromUser.save();
        console.log('friendship created');
    }

    if(req.xhr){
        
        return res.status(200).json({
            deleted : deleted , 
            message : "Request Successful",

        });
    }


    
      return res.redirect("/");
}