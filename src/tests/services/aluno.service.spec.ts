import test, { describe } from "node:test";
import { AlunoService } from "../../services/aluno.service";

describe('Aluno Service', () => {
    const createSut = () => {
        const alunoService = new AlunoService()
        return alunoService
    }

    describe('findAll', () => {
        test('Deve retornar a lista de alunos', () => {
            const sut = createSut()

        })
    })
})