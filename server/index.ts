import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB, disconnectDB} from "./lib/db";
import { errorHandler } from "./lib/handellers/errorHandeller";
import MainRoute from "./MainRoute";
// Load environment variables
dotenv.config();
// Create an express app
const app = express();
// Set the port
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// health check route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message : "welcome to the x clone" });
});

// all routes go here
// all routes are prefixed with /api/v1
app.use('/api/v1', MainRoute);

// Error handler
app.use(errorHandler)

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
        disconnectDB().then(() => {}).catch((error) => {console.log("Error disconnecting from database: ", error)});
      // Exit the process if the database connection fails
      process.exit(1);
    });




