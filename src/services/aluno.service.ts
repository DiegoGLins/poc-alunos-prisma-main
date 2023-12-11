import { CreateAlunoDTO, UpdateAlunoDTO } from "../dtos/aluno.dto";
import { Result } from "../dtos/service.dto";
import repository from "../database/prisma.connection";
import { Aluno } from "../models";
import { AlunoType } from "../types/alunotype";

export class AlunoService {
    public async findAll(nome?: string): Promise<Aluno[]> {
        // Lista todos os alunos do banco de dados
        const result = await repository.aluno.findMany({
            // Filtro com where
            where: {
                nome: nome?.toString(),
            },
            // Define quais os campos serão selecionados
            select: {
                password: false,
                id: true,
                nome: true,
                email: true,
                idade: true,
                type: true,
                createdAt: true,
            },
        });

        return result.map((item) => this.mapToModel(item));
    }

    public async create(params: CreateAlunoDTO): Promise<Result> {
        // Cria um novo aluno (model)
        const aluno = new Aluno(
            params.nome,
            params.email,
            params.idade,
            params.password,
            params.type
        );

        const typeM = AlunoType.alunoMatriculado
        const typeF = AlunoType.alunoFormado
        const typeT = AlunoType.alunoTechHelper

        if (aluno.type === typeM || aluno.type === typeF || aluno.type === typeT) {
            const created = await repository.aluno.create({
                data: {
                    nome: aluno.nome,
                    email: aluno.email,
                    idade: aluno.idade,
                    password: aluno.password,
                    type: aluno.type
                },
            });

            return {
                code: 201,
                message: "Aluno criado com sucesso",
                data: this.mapToModel(created).toJson(),
            };
        }
        // Salva o aluno no banco de dados usando o Prisma
        return {
            code: 403,
            message: "Tipo de aluno incorreto"
        }
    }

    public async update(params: UpdateAlunoDTO): Promise<Result> {
        const aluno = await repository.aluno.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!aluno) {
            return {
                code: 404,
                message: "Aluno not found",
            };
        }

        aluno.nome = params.nome ?? aluno.nome;
        aluno.idade = params.idade ?? aluno.idade;

        await repository.aluno.update({
            where: {
                id: params.id,
            },
            data: {
                nome: aluno.nome,
                idade: aluno.idade,
            },
        });

        return {
            code: 200,
            message: "Aluno sucessfully updated",
            data: this.mapToModel(aluno).toJson(),
        };
    }

    public async delete(id: string): Promise<Result> {
        const aluno = await repository.aluno.findUnique({
            where: {
                id,
            },
        });

        if (!aluno) {
            return {
                code: 404,
                message: "Aluno not found",
            };
        }

        await repository.aluno.delete({
            where: {
                id,
            },
        });

        return {
            code: 200,
            message: "Aluno successfully deleted",
        };
    }

    public mapToModel(aluno: any) {
        return new Aluno(
            aluno.nome,
            aluno.email,
            aluno.idade,
            aluno.password,
            aluno.type
        );
    }
}
