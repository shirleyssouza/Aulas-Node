import { Router } from "express";
import { Usuario } from "../models/usuario.js";
import { usuarioValidation } from "../utils/validations.js";

export const usuarioRouter = Router();

usuarioRouter.post("/usuario", async (req, res) => {
    const { error, value } = usuarioValidation.validate(req.body);

    if (error) {
        res.status(400).json({
            message: "Dados inválidos",
            error: error.details[0].message,
        });
        return;
    }
    const { nome, email, senha } = value;

    try {
        const novoUsuario = new Usuario({ nome, email, senha });
        await novoUsuario.save();
        res.json({ message: "Usuario criado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar usuário." });
    }
});
