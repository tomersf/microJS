import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Env } from "../utils/env";

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, Env.get('JWT_KEY')) as UserPayload
        req.currentUser = payload;
    } catch (error) { }
    next()
}