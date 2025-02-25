import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createReferral } from './controllers/referralController.js';

dotenv.config();  // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5000;

// 🛠️ Configure CORS properly
app.use(cors({
  origin: '*',  // Allow all origins (or specify frontend URL)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization']  // Allowed headers
}));

app.use(express.json());

// ✅ Default route
app.get('/', (req, res) => {
  res.send('Hello, welcome!');
});

// ✅ POST route for creating a referral
app.post('/api/referral', createReferral);

// ✅ Handle OPTIONS Preflight Requests
app.options('*', cors());

// ✅ Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
