import { Request, Response } from "express";
import { AlunoService } from "../services/aluno.service";
import AuthService from "../services/auth.service";


export class AuthController {
    public async list(req: Request, res: Response) {
        try {
            const { nome } = req.query;

            const service = new AlunoService();
            const result = await service.findAll(nome as string);

            res.status(200).send({
                ok: true,
                data: result.map((item) => item.toJson()),
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send({
                    ok: false,
                    message: "Fields not provided",
                });
            }

            const result = await AuthService.login(email, password);

            if (result.code !== 200) {
                return res.status(result.code).json({
                    ok: false,
                    code: 401,
                    message: "Invalid credentials"
                })
            }
            res.status(result.code).json(result.data);

        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, idade } = req.body;

            const result = await new AlunoService().update({
                id,
                nome,
                idade,
            });

            res.status(result.code).send(result);
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const result = await new AlunoService().delete(id);

            res.status(result.code).send(result);
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
