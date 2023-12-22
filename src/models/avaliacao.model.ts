import { v4 } from "uuid";
import { Aluno } from "./aluno.model";

export class Avaliacao {
    public typeAluno: Aluno

    constructor(public idAluno: string, private _disciplina: string, private _nota: number, typeAluno: Aluno) {
        this.typeAluno = typeAluno
    }

    public toJson() {
        return {

            idAluno: this.idAluno,
            nota: this._nota,
            disciplina: this._disciplina,
            typeAluno: this.typeAluno.type
        };
    }
}


