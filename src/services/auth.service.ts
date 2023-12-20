import { Result } from "../dtos/service.dto";
import repository from "../database/prisma.connection";
import jwt from 'jsonwebtoken'

class AuthService {
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
                aluno: aluno,
                token
            },
        };
    }

}

export default new AuthService()
