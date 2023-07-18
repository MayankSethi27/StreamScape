const {saveChat}=require('../controller/chats_controller');
module.exports.chatSockets=function(socketServer){
    let io=require('socket.io')(socketServer);

    //the server(or observer) receives the connection establishment
    io.sockets.on('connection',function(socket){
       console.log('new connection received',socket.io); 

       socket.on('disconnect',function(){
        console.log('socket disconnected !');
      });

       
      //server will receive request by subscriber to join chatroom by detection the 'join_room' event 
      socket.on('join_room',function(data){
        console.log('joining request received',data);

        //if request received then socket will join that chatroom
        // ---> this function will add subscriber to chatroom
        //if chatroom with name 'StreamScape' is already exists then user will entered and
        // if not exist then socket will create new and user will be entered 
        socket.join(data.chatroom);

        //emit to all the other users in the chatroom that 'an user has joined the room by notifing them'
        io.in(data.chatroom).emit('user_joined',data);
      });

      // CHANGE :: detect send_message and broadcast to everyone in the room
      socket.on('send_message', function(data){
        io.in(data.chatroom).emit('receive_message', data);
        saveChat(data);
    });

    });

    
}