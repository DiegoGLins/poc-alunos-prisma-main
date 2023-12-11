import { Router } from "express";
import { AuthController } from "../controllers";

export const authRoutes = () => {
    const router = Router();
    const controller = new AuthController()

    router.post("/", controller.login);

    return router;
};
