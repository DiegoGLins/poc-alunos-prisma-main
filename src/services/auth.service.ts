import { Result } from "../dtos/service.dto";
import repository from "../database/prisma.connection";
import jwt from 'jsonwebtoken'

class AuthService {
    /**
      * Metódo responsável por logar o usuário no sistema.
      *
      * @param email - O primeiro parâmetro a ser passado é o email do usuário
      * @param password - O segundo parâmetro a ser passado é a senha do usuário
      * @returns - Se email e senha do usuário forem válidos, retorna os dados
      * do usuário com as propriedades: id, email, nome e o token gerado com jwt
      * ao efetuar o login
      *
      */

    public async login(email: string, password: string): Promise<Result> {
        const result = await repository.aluno.findUnique({
            where: {
                email,
                password,
            },
        });

        if (!result) {
            return {
                code: 404,
                message: "Usuario não encontrado",
            };
        }

        const aluno = {
            id: result.id,
            email: result.email,
            nome: result.nome,
            type: result.type
        }

        const token = jwt.sign(aluno, `${process.env.JWT_SECRET}`, {
            expiresIn: "2h"
        })

        return {
            code: 200,
            message: "Login successfuly done",
            data: {
                aluno,
                token
            },
        };
    }

}

export default new AuthService()
