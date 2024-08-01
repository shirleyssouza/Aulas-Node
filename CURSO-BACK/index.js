import { authenticate, connection } from "./config/database.js";
import express from "express";
import { cursoRouter } from "./routes/cursos.js";
import { alunoRouter } from "./routes/alunos.js";

authenticate(connection).then(() => {
    connection.sync();
});

const app = express();
app.use(express.json());

app.use(cursoRouter);
app.use(alunoRouter);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
});

// CURSO PRINCIPAL
// delete curso deleta aluno e professor
// quando listar curso include professor
// adicionar e editar curso tem que adicionar professor
// Marcelo Reggiani

// listar o aluno lista o curso
