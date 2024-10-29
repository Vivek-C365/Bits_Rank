# Bits Rank - URL Shortening Service

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Welcome to **Bits Rank**, a powerful and easy-to-use URL shortening service designed to help you manage and share your links effortlessly. With Bits Rank, you can transform long URLs into concise links, track click analytics, and enhance your overall link management experience.

## Features

- **Shorten URLs**: Convert long URLs into short, easy-to-share links.
- **Click Analytics**: Track the number of clicks and other statistics for your shortened links.
- **User Accounts**: Sign up and log in to manage your links.
- **Custom Aliases**: Create personalized short URLs.
- **Responsive Design**: Fully responsive interface for optimal use on any device.

## Technologies Used

- **Frontend**: Vite.js, React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS

## Installation

To run Bits Rank locally, follow these steps:  
1. Clone the repository:  
   `git clone https://github.com/Vivek-C365/Bits-Rank.git`  
2. Navigate into the project directory:  
   `cd Bits-Rank`  
3. Install dependencies for the backend:  
   `cd backend`  
   `npm install`  
4. Install dependencies for the frontend:  
   `cd ../frontend`  
   `npm install`  
5. Set up environment variables for the backend. Create a `.env` file in the `backend` directory and add the following:  
   `MONGODB_URI=your_mongodb_connection_string`  
   `JWT_SECRET=your_jwt_secret`  
6. Start the backend server:  
   `cd ../backend`  
   `npm start`  
7. In a new terminal, start the frontend:  
   `cd frontend`  
   `npm run dev`  

Your application should now be running at `http://localhost:3000`.

## Usage

- **Shorten a URL**: Enter your long URL into the provided input field and click "Shorten" to generate a short link.
- **Track Clicks**: Log into your account to view analytics for your shortened URLs.

## API Documentation

You can interact with the Bits Rank API to create, retrieve, and manage shortened URLs. For detailed API endpoints and usage, refer to the [API Documentation](./API_DOCUMENTATION.md).

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.  
1. Fork the project  
2. Create your feature branch: `git checkout -b feature/YourFeature`  
3. Commit your changes: `git commit -m 'Add some feature'`  
4. Push to the branch: `git push origin feature/YourFeature`  
5. Open a pull request  

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For any questions or feedback, please reach out:  
- **Your Name**: Vivek Choudhary  
- **Email**: your-email@example.com  
- **GitHub**: [Vivek-C365](https://github.com/Vivek-C365)  

---

Thank you for checking out Bits Rank! We hope you enjoy using our URL shortening service!
