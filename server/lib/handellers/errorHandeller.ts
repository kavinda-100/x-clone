import type { Response, Request, NextFunction, ErrorRequestHandler } from 'express';

// middleware to handle errors
export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("errorHandler: ", err.stack)
    console.log("errorHandler: ", err.message)
    res.status(500).json({"message": "Internal Server Error"})
    next()
}