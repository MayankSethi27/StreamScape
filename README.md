# StreamScape - Social Media App

StreamScape is a dynamic social media application built using Node.js, EJS, Express.js, and MongoDB. It offers a comprehensive set of features, including all CRUD operations, post creation, comment and like functionality with AJAX, and a real-time chatbot using Socket.io. The application also ensures secure user authentication through Passport.js.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MayankSethi27/StreamScape.git
   cd streamscape
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of the project and add the following:

   ```env
   PORT=3000
   MONGODB_URI=mongodb:YOUR_URI
   SESSION_SECRET=your_session_secret
   ```

   Note: Modify the `PORT`, `MONGODB_URI`, and `SESSION_SECRET` values as needed.

4. Run the application:

   ```bash
   npm start
   ```

   The website will be accessible at `http://localhost:3000`.

## Features

- **User Authentication:** Secure user authentication is implemented using Passport.js. Users can sign up, log in, and log out with their credentials.
- **Post Creation:** Users can create and share posts with text and media content, fostering interaction among community members.
- **Comment and Like Functionality:** Users can comment on posts and express their appreciation by liking posts.
- **Real-time Chatbot:** StreamScape includes a real-time chatbot powered by Socket.io, allowing users to interact with the chatbot and receive instant responses.
- **AJAX Interactions:** All interactions related to posts, comments, and likes are handled with AJAX, providing a seamless and responsive user experience.

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Sign up for a new account or log in with your existing credentials.
3. Create posts to share updates, thoughts, or media content with the community.
4. Interact with other users' posts by leaving comments or liking them.
5. Engage with the real-time chatbot to have interactive conversations.

## Contributing

Contributions are welcome! If you find any bugs or want to add new features, feel free to open an issue or submit a pull request.



Thank you for using StreamScape Social Media App! If you have any questions or need further assistance, please don't hesitate to contact us. Happy networking and sharing!
