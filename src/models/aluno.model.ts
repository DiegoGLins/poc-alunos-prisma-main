import { AlunoType } from "../types/alunotype";
import { Avaliacao } from "./avaliacao.model";

export class Aluno {
    private _avaliacoes: Avaliacao[];
    constructor(
        private _nome: string,
        private _email: string,
        private _idade: number,
        private _password: string,
        public type: AlunoType,
    ) {
        this.type = type
        this._avaliacoes = [];
    }

    public get idade() {
        return this._idade
    }


    public get nome() {
        return this._nome;
    }

    public get email() {
        return this._email
    }

    public get avaliacoes() {
        return this._avaliacoes;
    }

    public get password() {
        return this._password
    }

    public toJson() {
        return {
            nome: this._nome,
            email: this._email,
            idade: this._idade,
            type: this.type
        };
    }
}
