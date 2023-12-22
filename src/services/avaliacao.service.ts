import repository from "../database/prisma.connection";
import { AvaliacaoDTO } from "../dtos/avaliacao.dto";
import { ResponseDto } from "../dtos/response.dto";
import { Aluno, Avaliacao } from "../models";
import { AlunoType } from "../types/alunotype";

class AvaliacaoService {
    public async createAvaliacao(data: AvaliacaoDTO) {
        try {
            const aluno = await repository.aluno.findUnique({
                where: {
                    id: data.idAluno,
                },
            });

            // Se o aluno não existe, retorna 404
            if (!aluno) {
                return {
                    ok: false,
                    code: 404,
                    message: "Aluno não encontrado",
                }
            }

            else {
                const result = await repository.avaliacao.create({
                    data: {
                        idAluno: data.idAluno,
                        disciplina: data.disciplina,
                        nota: data.nota,
                    },
                });

                return {
                    ok: true,
                    code: 200,
                    message: "Avaliação criada com sucesso",
                    data: result
                }
            }
        } catch (error: any) {
            return {
                ok: false,
                code: 404,
                message: error.toString()
            }
        }
    }

    public async listAllAvaliacoes(type: string, idAluno: string) {
        try {
            let where = {}
            if (type === AlunoType.alunoFormado || type === AlunoType.alunoMatriculado) {
                where = { idAluno }
            }
            const avaliacao = await repository.avaliacao.findMany({
                select: {
                    id: true,
                    disciplina: true,
                    nota: true,
                    aluno: {
                        select: {
                            id: true,
                            nome: true,
                            type: true
                        }
                    }
                },
                where
            })

            if (!avaliacao.length) {
                return {
                    ok: true,
                    code: 204,
                    message: "Nenhuma avaliação para ser listada"
                }
            }
            return {
                ok: true,
                code: 200,
                message: "Avaliações listadas com sucesso",
                data: avaliacao
            }
        }
        catch (error: any) {
            return {
                ok: false,
                code: 500,
                message: error.toString()
            }
        }
    }
}

export default new AvaliacaoService()




