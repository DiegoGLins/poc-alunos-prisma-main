import { Aluno } from "../models";
import { AlunoType } from "../types/alunotype";

export interface AvaliacaoDTO {
    idAluno: string
    disciplina: string;
    nota: number;
    typeAluno?: AlunoType
}
