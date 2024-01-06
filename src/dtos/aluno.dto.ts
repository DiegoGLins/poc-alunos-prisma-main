import { AlunoType } from "../types/alunotype";

export interface CreateAlunoDTO {
    id?: string
    nome: string;
    email: string;
    idade: number;
    password: string;
    type: AlunoType
}

export interface UpdateAlunoDTO {
    id: string;
    nome?: string;
    email?: string;
    idade?: number;
}
