import { Router } from "express";
import { AvaliacaoController } from "../controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authMiddlewareForTechHelp } from "../middlewares/auth.middlewareForTechHelp";
import { authMiddlewareTypeAluno } from "../middlewares/auth.middlewareTypeAluno";

export const avaliacaoRoutes = () => {
    const router = Router({
        mergeParams: true,
    });
    const controller = new AvaliacaoController();

    router.get("/:idAluno", authMiddleware, controller.list);
    router.post("/", [authMiddleware, authMiddlewareTypeAluno], controller.create);
    router.put("/:idAvaliacao/:idAluno", [authMiddleware, authMiddlewareForTechHelp], controller.update);
    router.delete("/:idAvaliacao/:idAluno", [authMiddleware, authMiddlewareForTechHelp], controller.delete);

    return router;
};
