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

        const user = {
            id: result.id,
            email: result.email,
            nome: result.nome,
            type: result.type
        }

        const token = jwt.sign(user, `${process.env.JWT_SECRET}`, {
            expiresIn: "2h"
        })

        return {
            code: 200,
            message: "Login successfuly done",
            data: {
                user: user,
                token
            },
        };
    }

}

export default new AuthService()
