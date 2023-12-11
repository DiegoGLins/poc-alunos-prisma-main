import { Request } from 'express';

export declare module 'express-serve-static-core' {
    interface Request {
        user: {
            id: string,
            email: string,
            nome: string,
            type: string
        };
    }
}