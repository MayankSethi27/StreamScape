
// Import the Chat model
const Chat = require('../schema/chat_schema');

// Controller action to save chats
const saveChat = async (req, res) => {
  try {
    // Get the message and user ID from the request body
    const message = req.body.message;
    const userId = req.body.user;


    // Create a new chat instance
    const chat =await Chat.create({
      message,
      user: userId,
    });
console.log('chat Saved')
    // Save the chat to the database
    // await chat.save();

    // Return the saved chat as the response
    res.json(chat);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error saving chat:', error);
    res.status(500).json({ error: 'Failed to save chat' });
  }
};

// Export the controller action
module.exports = {
  saveChat,
};
