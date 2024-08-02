import { Aluno } from "../models/aluno.js";
import { Curso } from "../models/curso.js";
import { Router } from "express";

export const alunoRouter = Router();

alunoRouter.get("/consultaralunos", async (req, res) => {
    const listaAlunos = await Aluno.findAll();
    res.json(listaAlunos);
});

alunoRouter.get("/consultaralunos/:id", async (req, res) => {
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

alunoRouter.post("/registraralunos", async (req, res) => {
    const { nome, email, telefone, responsavel, cursoId } = req.body;

    try {
        await Aluno.create({
            nome,
            email,
            telefone,
            responsavel,
            cursoId,
        });
        res.json({ message: "Aluno registrado com sucesso." });
    } catch (error) {
        res.status(500),
            res.json({ message: "Um erro ocorreu ao registrar o aluno." });
    }
});

alunoRouter.put("/editaralunos/:id", async (req, res) => {
    const { nome, email, telefone, responsavel, cursoId } = req.body;
    const idAluno = req.params.id;

    try {
        const aluno = await Aluno.findOne({ where: { id: idAluno } });

        if (aluno) {
            await aluno.update({ nome, email, telefone, responsavel, cursoId });
            res.json({ message: "Aluno editado com sucesso." });
        } else {
            res.status(404).json({ message: "Aluno não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao editar o aluno." });
    }
});

alunoRouter.delete("/removeralunos/:id", async (req, res) => {
    const idAluno = req.params.id;

    try {
        const aluno = await Aluno.findOne({ where: { id: idAluno } });

        if (aluno) {
            await aluno.destroy();
            res.json({ message: "Aluno removido com suesso." });
        } else {
            res.status(404).json({ message: "Aluno não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover o aluno." });
    }
});
