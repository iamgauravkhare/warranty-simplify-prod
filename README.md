# Warranty-Simplify

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

The Warranty Claim Web Application is a robust platform designed to streamline the process of managing warranty claims for consumers, retailers, and manufacturers. The application allows users to register and claim warranties, track the status of their claims in real-time, and manage the entire lifecycle of a warranty claim efficiently.

### Live Link

Check out the live application [here](https://your-deployed-link.com).

## Features

- User authentication and role-based access control (Consumer, Retailer, Manufacturer)
- Register and claim warranties with product IDs
- Upload and manage necessary documents for warranty claims
- Real-time tracking of claim statuses with live updates
- Dashboards for retailers and manufacturers to manage claims
- Middleware to ensure secure API access based on user roles

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB

### Frontend

- React.js (with Vite)
- Tailwind CSS
- React Router DOM

### Others

- Redux (for state management)
- Axios (for API requests)
- Cloudinary (for document storage)
- ESLint (for code quality)
- React Hook Form (for forms)
- React Icons (for icons)

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB instance running
- Cloudinary account for document storage

### Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/warranty-claim-app.git
   cd warranty-claim-app
   ```

2. **Backend Setup:**

   - Navigate to the server directory:
     ```sh
     cd server
     ```
   - Install dependencies:
     ```sh
     npm install
     ```

3. **Frontend Setup:**

   - Navigate back to the root directory:
     ```sh
     cd ../
     ```
   - Install dependencies:
     ```sh
     npm install
     ```
   - Start the development server (this command will start both the server and client simultaneously):
     ```sh
     npm run dev
     ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Register a new user account or log in with an existing account.
3. Depending on your role (Consumer, Retailer, Manufacturer), you will be redirected to the appropriate dashboard.
4. Use the dashboard to register new warranties, claim existing warranties, and track the status of your claims.
