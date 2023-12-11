import { Router } from "express";
import { TurmaController } from "../controllers/turma.controller";
import { matriculaRoutes } from "./matricula.routes";

export const turmaRoutes = () => {
    const router = Router();
    const controller = new TurmaController();

    router.get("/", controller.list);
    router.post("/", controller.create);

    router.use("/:idTurma/matricula", matriculaRoutes());

    return router;
};
