// Import the Chat model
const Chat = require('../schema/chat_schema');

// Controller action to save chats
const saveChat = async (data) => {
  console.log('chat running');
  try {
    // Get the message and user ID from the request body
    const message = data.message;
    const userId = data.user_email;

console.log(message,'7637');
    // Create a new chat instance
    const chat =await Chat.create({
      message,
      user: userId,
    });

    // Save the chat to the database
     await chat.save();
     console.log('chat Saved')
    // Return the saved chat as the response
    // res.json(chat);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error saving chat:', error);
  }
};

// Export the controller action
module.exports = {
  saveChat,
};
