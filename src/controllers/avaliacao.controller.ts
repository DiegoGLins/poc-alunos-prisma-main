import { Request, Response } from "express";
import repository from "../database/prisma.connection";
import avaliacaoService from "../services/avaliacao.service";

export class AvaliacaoController {
    public async listAll(req: Request, res: Response) {
        try {
            const { type, id } = req.user
            const result = await avaliacaoService.listAllAvaliacoes(type, id)
            return res.status(result.code).send(result.data)

        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { idAluno, disciplina, nota } = req.body;

            // Valida os campos obrigatórios
            if (!disciplina || !nota || !idAluno) {
                return res.status(400).send({
                    ok: false,
                    message: "Campos não foram informados.",
                });
            }

            const notaNum = Number(nota);
            if (notaNum < 0 || notaNum > 10) {
                return res.status(400).send({
                    ok: false,
                    message: "Nota precisa estar entre 0 e 10",
                });
            }

            const alunoToEvaluate = await repository.aluno.findUnique({
                where: {
                    id: idAluno
                },
                select: {
                    type: true
                }
            })
            if (!alunoToEvaluate) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno para avaliar não encontrado"
                })
            }

            if (req.user.type === "M" && req.user.id !== idAluno) {
                return res.status(401).send({
                    ok: false,
                    code: 401,
                    message: "Você não pode criar avaliação para outro aluno"
                })
            }

            const result = await avaliacaoService.createAvaliacao({
                idAluno,
                nota,
                disciplina
            })

            if (result?.ok) {
                res.status(result?.code!).send({
                    ok: true,
                    code: 201,
                    message: "Avaliação criada com sucesso",
                    data: result?.data
                })

            } else {
                res.status(result?.code!).send({
                    ok: false,
                    code: result?.code,
                    message: result?.message,
                });
            }

        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { idAvaliacao, idAluno } = req.params;
            const { disciplina, nota } = req.body;

            // Valida os campos obrigatórios
            if (!disciplina || !nota) {
                return res.status(400).send({
                    ok: false,
                    message: "Campos não foram informados",
                });
            }

            const notaNum = Number(nota);
            if (notaNum < 0 || notaNum > 10) {
                return res.status(400).send({
                    ok: false,
                    message: "Nota precisa estar entre 0 e 10",
                });
            }

            // Verifica se o aluno existe
            const aluno = await repository.aluno.findUnique({
                where: {
                    id: idAluno,
                },
            });

            // Se o aluno não existe, retorna 404
            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno não existe",
                });
            }

            const findAvaliacao = await repository.avaliacao.findUnique({
                where: {
                    id: idAvaliacao
                },
                select: {
                    idAluno: true
                }
            })

            if (!findAvaliacao) {
                return res.status(404).send({
                    ok: false,
                    code: 404,
                    message: "Avaliação para editar não encontrada"
                })
            }

            if (findAvaliacao.idAluno !== idAluno) {
                return res.status(401).send({
                    ok: false,
                    code: 401,
                    message: "Avaliação selecionada para editar não corresponde ao aluno selecionado",
                });
            }
            // Salva a avaliação no banco de dados
            const result = await repository.avaliacao.update({
                where: {
                    id: idAvaliacao,
                },
                data: {
                    disciplina,
                    nota,
                },
            });

            res.status(200).send({
                ok: true,
                data: result,
                message: "Avaliação editada com sucesso",
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { idAluno, idAvaliacao } = req.params;

            // Verifica se o aluno existe
            const aluno = await repository.aluno.findUnique({
                where: {
                    id: idAluno,
                },
            });

            // Se o aluno não existe, retorna 404
            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno não existe",
                });
            }

            const findAvaliacao = await repository.avaliacao.findUnique({
                where: {
                    id: idAvaliacao
                },
                select: {
                    idAluno: true
                }
            })

            if (!findAvaliacao) {
                return res.status(404).send({
                    ok: false,
                    code: 404,
                    message: "Avaliação para deletar não encontrada"
                })
            }

            if (findAvaliacao.idAluno !== idAluno) {
                return res.status(401).send({
                    ok: false,
                    code: 401,
                    message: "Avaliação selecionada para deletar não corresponde ao aluno selecionado",
                });
            }
            // Salva a avaliação no banco de dados
            const result = await repository.avaliacao.delete({
                where: {
                    id: idAvaliacao,
                },
            });

            res.status(200).send({
                ok: true,
                data: result,
                message: "Avaliação deletada com sucesso",
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
