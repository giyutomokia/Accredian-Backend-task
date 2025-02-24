import express from "express";
import cors from "cors";
import referralRoutes from "./routes/referralRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/referral", referralRoutes);  // ✅ Matches frontend request URL

export default app;
