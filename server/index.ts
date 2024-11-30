import express from "express";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ImageKit from "imagekit";
import path from "path";

import { connectDB, disconnectDB } from "./lib/db";
import { errorHandler } from "./lib/handellers/errorHandeller";
import MainRoute from "./MainRoute";
// Load environment variables
dotenv.config();
// Create an express app
const app = express();
// Set the port
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// allow cross-origin requests from the frontend for ImageKit
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});
// ImageKit setup
export const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKITIO_URL_ENDPOINT as string,
  publicKey: process.env.IMAGEKITIO_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKITIO_PRIVATE_KEY as string,
});
// ImageKit authentication route
app.get("/auth", function (req: Request, res: Response) {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

// health check route
app.get("/health-check", (req: Request, res: Response) => {
  res.status(200).json({ message: "welcome to the x clone" });
});
// all routes go here
// all routes are prefixed with /api/v1
app.use("/api/v1", MainRoute);
// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  app.get("*", (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")),
  );
}

// Error handler
app.use(errorHandler);

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database: ", error);
    // Disconnect the database if the connection fails
    disconnectDB()
      .then(() => {})
      .catch((error) => {
        console.log("Error disconnecting from database: ", error);
      });
    // Exit the process if the database connection fails
    process.exit(1);
  });
