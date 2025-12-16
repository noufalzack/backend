import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authroutes.js";

dotenv.config();

const app = express();

/* ===== CORS FIX ===== */
app.use(
  cors({
    origin: "*", // allow Render frontend
    credentials: true,
  })
);

app.use(express.json());

/* ===== ROUTES ===== */
app.use("/api/auth", authRoutes);

/* ===== MONGO CONNECTION ===== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

/* ===== SERVER ===== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
