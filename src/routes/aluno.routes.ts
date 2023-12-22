import { Router } from "express";
import { AlunoController } from "../controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

export const alunoRoutes = () => {
    const router = Router();
    const controller = new AlunoController();

    router.get("/", controller.list);
    router.post("/", controller.create);
    router.put("/:id", authMiddleware, controller.update);
    router.delete("/:id", controller.delete);

    return router;
};
