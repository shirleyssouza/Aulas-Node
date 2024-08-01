import { Router } from "express";
import { Curso } from "../models/curso.js";
import { Professor } from "../models/professor.js";

export const cursoRouter = Router();

cursoRouter.get("/cursos", async (req, res) => {
    const listaCursos = await Curso.findAll();
    res.json({ listaCursos });
});

cursoRouter.get("/cursos/:id", async (req, res) => {
    const curso = await Curso.findOne({
        where: { id: req.params.id },
        include: [Professor],
    });
    if (curso) {
        res.json({ curso });
    } else {
        res.status(500).json({ message: "Curso não encontrado." });
    }
});

cursoRouter.post("/cursos", async (req, res) => {
    const { nome, turno, dataInicio, professor } = req.body;
    try {
        await Curso.create(
            { nome, turno, dataInicio, professor },
            { include: [Professor] }
        );
        res.json({ message: "Curso criado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar novo curso." });
    }
});

cursoRouter.put("/cursos/:id", async (req, res) => {
    const idCursos = req.params.id;
    const { nome, turno, dataInicio, professor } = req.body;

    try {
        const curso = await Curso.findOne({ where: { id: idCursos } });

        if (curso) {
            await curso.update({ nome, turno, dataInicio });
            await Professor.update(professor, { where: { cursoId: idCursos } });
            res.json({ message: "Curso atualizado com sucesso." });
        } else {
            res.status(404).json({ message: "Curso não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o curso." });
    }
});

cursoRouter.delete("/cursos/:id", async (req, res) => {
    const idCurso = req.params.id;
    try {
        const curso = await Curso.findOne({ where: { id: idCurso } });

        if (curso) {
            await curso.destroy();
            res.json({ message: "Curso excluido com sucesso." });
        } else {
            res.status(404).json({ message: "Curso não encontrado." });
        }
    } catch (error) {
        res.status(500).json({
            message: "Ocorreu um erro ao deletar o curso.",
        });
    }
});
