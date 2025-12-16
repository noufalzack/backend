import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */

// ✅ Allow requests from frontend (local + render)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend-name.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// ✅ Parse JSON body
app.use(express.json());

/* ================= ROUTES ================= */

// Health check (IMPORTANT for Render)
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend API is running 🚀" });
});

// Auth routes
app.use("/api/auth", authRoutes);

/* ================= DATABASE CONNECTION ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
