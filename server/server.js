// Importing necessary modules and packages using ES6 syntax
import express from "express";
import userRoutes from "./routes/user.js";
import profileRoutes from "./routes/profile.js";
import database from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { cloudinaryConnect } from "./config/cloudinary.js";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

// Loading environment variables from .env file
dotenv.config();

// Creating express app
const app = express();

// Setting up port number
const PORT = process.env.PORT || 4000;

// Connecting to database
database.connect();

// ⚠️ CRITICAL FIX: Add limits BEFORE using express.json()
// Middlewares with increased limits
app.use(express.json({ limit: '50mb' })); // 👈 ADD THIS LIMIT
app.use(express.urlencoded({ 
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
})); // 👈 ADD THIS LIMIT

app.use(cookieParser());

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// File upload middleware with increased limits
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { 
      fileSize: 50 * 1024 * 1024 // 50MB
    },
    abortOnLimit: true,
    createParentPath: true,
  })
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);

// Testing the server
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

// Global error handler (ADD THIS)
app.use((err, req, res, next) => {
  // Handle payload too large error
  if (err.type === 'entity.too.large' || err.name === 'PayloadTooLargeError') {
    return res.status(413).json({
      success: false,
      message: 'File size too large. Maximum allowed size is 50MB',
    });
  }

  // Handle other errors
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// Listening to the server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});

// End of code.
