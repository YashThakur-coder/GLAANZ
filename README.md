# Glaanz - MERN Stack E-Commerce

This repository contains the full-stack MERN (MongoDB, Express, React, Node.js) rewrite of the Glaanz E-commerce platform.

## Features Added
- **Full Backend API**: Node.js and Express.js backend handling users, products, and orders.
- **MongoDB Database**: Mongoose schemas for managing application data with robust relationships.
- **Authentication**: JWT-based login and registration system embedded in the Account View.
- **Global State Management**: React Context API managing User Sessions and Shopping Cart states.
- **WhatsApp Checkout**: Integrated checkout flow that generates a pre-filled WhatsApp link (`wa.me`) for seamless order processing.

## Project Structure
- `frontend/`: The Vite React standalone application containing the pixel-perfect UI with modern context hooks.
- `backend/`: The Express.js backend application serving APIs and acting as the bridge to the MongoDB database.

## Prerequisites
- Node.js (v18 or higher)
- MongoDB Database (Local or MongoDB Atlas)

## Getting Started

### 1. Setup Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Rename `.env.example` to `.env` and fill in your MongoDB URI and JWT Secret:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/glaanz
   JWT_SECRET=your_jwt_secret_key_here
   ```
4. Seed the Database:
   Run the following command to populate the database with initial products and admin user:
   ```bash
   node seeder.js
   ```
5. Start the server:
   ```bash
   node server.js
   ```

### 2. Setup Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Usage
- Creating an Account: Navigate to the Member Portal (Account) to register a new user.
- Browsing: Products are dynamically fetched from the database.
- Checkout: Add items to the cart and click "Begin Secure Checkout" to save the order and redirect to WhatsApp confirmation.

## Deployment Ready
- **Frontend**: Ready to be deployed on Vercel or Netlify. Build command: `npm run build`
- **Backend**: Ready to be deployed on Render or Railway. Start command: `node server.js`
