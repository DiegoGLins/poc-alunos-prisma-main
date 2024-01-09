import { Request, Response } from "express";
import { AlunoService } from "../services/aluno.service";

/**
 * Controller com todas as ações a respeito de alunos.
 */
export class AlunoController {
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

    public async create(req: Request, res: Response) {
        try {
            // Busca os campos do body
            const { nome, email, password, idade, type } = req.body;

            // Valida se todos os campos foram informados
            if (!nome || !email || !password || !idade || !type) {
                return res.status(400).send({
                    ok: false,
                    message: "Fields not provided",
                });
            }

            const result = await new AlunoService().create(req.body);
            res.status(result.code).send(result?.data);

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
            const { nome, idade, email } = req.body;

            const result = await new AlunoService().update({
                id,
                nome,
                idade,
                email
            });

            res.status(result.code).send(result.data);
        } catch (error: any) {
            res.status(500).send({
                code: 500,
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
