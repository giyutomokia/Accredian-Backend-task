import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createReferral } from './controllers/referralController.js'; // Correct import

dotenv.config();  // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// POST route for creating a referral
app.post('/api/referral', createReferral);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
