import express from "express";
import cors from "cors";
import { alunoRoutes, turmaRoutes } from "./routes";
import { authRoutes } from "./routes/auth.routes";
import * as dotenv from "dotenv";
import { avaliacaoRoutes } from "./routes/avaliacao.routes";
import swaggerUi from "swagger-ui-express"
import swaggerDoc from "./docs/swagger.json"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes());
app.use("/alunos", alunoRoutes());
app.use("/turma", turmaRoutes());
app.use("/avaliacao", avaliacaoRoutes())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`API is running at port ${port}`);
});
