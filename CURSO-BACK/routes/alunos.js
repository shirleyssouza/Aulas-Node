import { Aluno } from "../models/aluno.js";
import { Curso } from "../models/curso.js";
import { Router } from "express";

export const alunoRouter = Router();

alunoRouter.get("/alunos", async (req, res) => {
    const listaAlunos = await Aluno.findAll();
    res.json(listaAlunos);
});

alunoRouter.get("/alunos/:id", async (req, res) => {
    const aluno = await Aluno.findOne({
        where: { id: req.params.id },
        include: [Curso],
    });
    if (aluno) {
        res.json(aluno);
    } else {
        res.status(500).json({ message: "Aluno não encontrado." });
    }
});
