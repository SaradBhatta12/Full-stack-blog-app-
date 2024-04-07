# Full Stack Blog Application

Welcome to our Full Stack Blog Application! This is a comprehensive web application designed for users to create, publish, and share blog posts easily. Built with modern web technologies, this application provides a seamless experience for both bloggers and readers.

## Features

- User Authentication: Secure user authentication system allows users to sign up, log in, and manage their accounts securely.
- Create and Publish Posts: Users can create new blog posts with rich text formatting, including text, images, and embedded media.
- Edit and Update Posts: Authors can easily edit and update their existing blog posts at any time.
- Categories and Tags: Organize blog posts by categories and tags for easy navigation and discovery.
- Commenting System: Engage with readers through a built-in commenting system that allows for discussions on each blog post.
- Responsive Design: The application is responsive and optimized for various devices, ensuring a consistent user experience across desktops, tablets, and mobile phones.
- User-Friendly Interface: Intuitive user interface makes it easy for both bloggers and readers to navigate, interact, and enjoy the content.
- Search Functionality: Search feature enables users to find specific blog posts quickly and efficiently.
- Social Sharing: Integration with social media platforms allows users to share their favorite blog posts with their network.
- Admin Panel: Admin dashboard provides administrators with tools to manage users, posts, comments, and site settings.

## Technologies Used

- Frontend: HTML, CSS, JavaScript, React.js
- Backend: Node.js, Express.js, MongoDB
- Authentication: Passport.js
- Database: MongoDB Atlas
- Cloud Storage: Cloudinary (for storing images)
- Deployment: Vercel (frontend), Heroku (backend)

## Installation

To run this application locally, follow these steps:

1. Clone the repository:
2. Navigate to the project directory:
3. Install dependencies for both the frontend and backend:
4. Create a `.env` file in the `backend` directory and add your environment variables:
   ##  PORT=5000
   ##  MONGODB_URI=your-mongodb-uri
   ##  SESSION_SECRET=your-session-secret
   ##  CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   ##  CLOUDINARY_API_KEY=your-cloudinary-api-key
   ##  CLOUDINARY_API_SECRET=your-cloudinary-api-secret
5. Start the backend server:
6. Run your application with nodemon or node command
7. Access the application in your web browser at `http://localhost:3000`.
