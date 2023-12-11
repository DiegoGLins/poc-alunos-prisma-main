import repository from "../database/prisma.connection";
import { AvaliacaoDTO } from "../dtos/avaliacao.dto";
import { ResponseDto } from "../dtos/response.dto";
import { Avaliacao } from "../models";

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

    public async listAvaliacoes(idAluno: string): Promise<ResponseDto> {
        // Lista todos os alunos do banco de dados
        try {
            const aluno = await repository.aluno.findUnique({
                where: {
                    id: idAluno,
                },
            })
            if (!aluno) {
                return {
                    ok: false,
                    code: 404,
                    message: "Aluno não encontrado"
                }
            }

            const listAvaliacoes = await repository.avaliacao.findMany({
                where: {
                    idAluno
                }, select: {
                    id: true,
                    disciplina: true,
                    nota: true,
                    aluno: {
                        select: {
                            nome: true,
                            id: true
                        }
                    }
                }
            })

            if (!listAvaliacoes.length) {
                return {
                    ok: true,
                    code: 200,
                    message: "Nenhuma avaliação para ser listada"
                }
            }
            return {
                ok: true,
                code: 200,
                message: "Avaliações listadas com sucesso",
                data: listAvaliacoes
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




