import { NextFunction, Request, Response } from 'express';
import z from 'zod';
import {zodIssueError} from "../lib";

// middleware to validate the request body
export const zodValidation = (schema: z.ZodObject<any, any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const validatedData = schema.safeParse(req.body);
        if(validatedData.success) {
            req.body = validatedData.data;
            next();
        }
        else {
            res.status(400).json({message: zodIssueError(validatedData.error.errors)});
        }
    };
};

