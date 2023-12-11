import { NextFunction, Request, Response } from "express";
import { AlunoType } from "../types/alunotype";

export async function authMiddlewareTypeAluno(req: Request,
    res: Response,
    next: NextFunction) {

    const type = req.user.type
    try {
        if (type === AlunoType.alunoFormado) {
            return res.status(403).send({
                ok: false,
                message: 'Acesso não autorizado'
            })
        }

        next()
    } catch (error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString()
        })
    }
}


