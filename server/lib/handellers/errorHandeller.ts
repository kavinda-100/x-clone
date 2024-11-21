import type { Response, Request, NextFunction, ErrorRequestHandler } from 'express';
import "dotenv/config"

// middleware to handle errors
export const errorHandler: ErrorRequestHandler = (err: Error | any, req: Request, res: Response, next: NextFunction) => {
    console.error("errorHandler: ", err.stack)
    console.log("errorHandler: ", err.message)
    res.status(500).json(
        {"message": process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message}
    )
    next()
}