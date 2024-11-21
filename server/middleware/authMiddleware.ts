import type {Request, Response, NextFunction} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import "dotenv/config";

import {errorResponse} from "../lib/handellers/responceHandeller";

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token
    if (!token) {
        errorResponse(res, 401, process.env.NODE_ENV === "development" ? "Unauthorized - no token provided" : "Unauthorized");
        return
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    console.log("decoded access_token", decoded);
    if(!decoded) {
        res.status(401).json({ message: process.env.NODE_ENV === "development" ? "Unauthorized - invalid token" : "Unauthorized" });
        return;
    }
    // check if the token is expired
    const current_time = Date.now().valueOf() / 1000;
    if(decoded.exp) {
        if (decoded.exp < current_time) {
            res.status(401).json({ message: process.env.NODE_ENV === "development" ? "Unauthorized - token expired" : "Unauthorized" });
            return;
        }
    }
    else {
        res.status(401).json({ message: process.env.NODE_ENV === "development" ? "Unauthorized - invalid token" : "Unauthorized" });
        return;
    }
    req.user = decoded;
    next();
}

export default authMiddleware;