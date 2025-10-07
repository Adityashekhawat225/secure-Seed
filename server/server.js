import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";

// Import routes
import authRouter from "./routes/userRoutes.js";
import vaultRouter from "./routes/vaultRoutes.js"; // ✅ correct filename

dotenv.config({ path: "./config/config.env" });

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://10.145.107.251:3000"], // frontend origins
    credentials: true,
  })
);

// Mount routes
app.use("/api/auth", authRouter);
app.use("/api/vault", vaultRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API is running successfully 🚀");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
