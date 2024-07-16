# Warranty-Simplify

### Live Link

Check out the live application [here](https://warranty-simplify-prod.vercel.app).

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
- MongoDB instance running (if wnat to run local)

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
2. To test the app, first create a manufacturer account with a brand name (e.g., Nike, Puma, Vivo, Samsung, Skechers). Then, create a retailer account and select the same brands. Finally, create a consumer account and register a warranty for a product that matches the manufacturer account's brand. Ensure both the manufacturer and retailer accounts exist before claiming a warranty. Note that only the specified brands are available for now.
3. Register a new user account or log in with an existing account.
4. Depending on your role (Consumer, Retailer, Manufacturer), you will be redirected to the appropriate dashboard.
5. Use the dashboard to register new warranties, claim existing warranties, and track the status of your claims.
