import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface UserPayload {
    id: string,
    email: string,
    nome: string,
    type: string
}

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization?.split(' ')[1]

        if (!authHeader) {
            return res.status(401).json({
                ok: false,
                message: "Authentication token not provided",
            });
        }
        const decoded = jwt.verify(authHeader, `${process.env.JWT_SECRET}`) as UserPayload

        if (!decoded) {
            return res.status(401).json({
                ok: false,
                message: "Invalid Credentials"
            })
        }

        req.user = {
            id: decoded?.id,
            email: decoded?.email,
            nome: decoded?.nome,
            type: decoded?.type,
        }

        next();
    } catch (error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
}



