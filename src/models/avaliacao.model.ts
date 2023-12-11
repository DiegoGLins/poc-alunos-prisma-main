import { v4 } from "uuid";
import { Aluno } from "./aluno.model";

export class Avaliacao {
    // private _id: string;
    public typeAluno: Aluno

    constructor(public idAluno: string, private _disciplina: string, private _nota: number, typeAluno: Aluno) {
        this.typeAluno = typeAluno
    }

    // public get id() {
    //     return this._id;
    // }

    public toJson() {
        return {
            // id: this._id,
            idAluno: this.idAluno,
            nota: this._nota,
            disciplina: this._disciplina,
            typeAluno: this.typeAluno.type
        };
    }
}


