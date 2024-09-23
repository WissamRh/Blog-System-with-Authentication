# Blog System with Authentication

A blog system built with React, Node.js, Express, and MySQL. Users can create, read, update, and delete posts with authentication. Features include search, pagination, and a responsive design. Only authenticated users can manage posts, while the homepage is publicly accessible.

## Features
- **CRUD Operations**: Users can create, read, update, and delete posts.
- **Authentication**: Only authenticated users can manage blog posts.
- **Search**: Search through blog posts using keywords.
- **Pagination**: Blog posts are displayed with pagination for easier browsing.
- **Responsive Design**: Fully responsive design for different screen sizes.
- **Public Access**: The homepage is accessible without login, but editing posts requires authentication.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JSON Web Token (JWT)
- **Axios**: For handling HTTP requests from frontend to backend

## Setup Instructions

### Prerequisites
Make sure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) (Make sure MySQL service is running)
- [Git](https://git-scm.com/) (for cloning the repository)

### Clone the Repository
To get started, clone the repository to your local machine:

git clone https://github.com/WissamRh/Blog-System-with-Authentication.git
cd Blog-System-with-Authentication
To access the frontend and run it you will have to make sure Localhost:3000 is not used by any service 
cd blog-frontend 
npm start (to run the frontend)

To access the Backend and run it you will have to make sure Localhost:3001 is not used by any service 
cd blog-backend 
node index.js (to run the Backend)

Make sure to create the database tables and ensure having the correct connection parameters with the database 

Need Help?
If you need any help or have any questions, feel free to contact me at:

Email: wissamrh02@htomail.com
GitHub: WissamRh
