import { Router } from "express";
import { contatoValidation } from "../utils/validations.js";
import { Contato } from "../models/contato.js";

export const contatosRouter = Router();

// INSERÇÃO DE CONTATO [POST]
contatosRouter.post("/contatos", async (req, res) => {
    // error -> objeto com detalhes dos erros de validação
    // value -> são os dados do req.body
    const { error, value } = contatoValidation.validate(req.body);

    if (error) {
        // HTTP 400 Bad request - Indica que a requisição tem dados inválidos
        res.status(400).json({
            message: "Dados inválidos",
            error: error.details[0].message,
        });
        return;
    }

    // Extrair as informações dos dados que foram validados anteriormente
    const { nome, sobrenome, email, telefone, observacoes, favorito } = value;

    try {
        const novoContato = new Contato({
            nome,
            sobrenome,
            email,
            telefone,
            observacoes,
            favorito,
        });
        await novoContato.save();
        res.json({ message: "Contato criado com sucesso." });
    } catch (err) {
        res.status(500).json({ message: "Um erro ocorreu.", error: err });
    }
});

// LISTAGEM DE CONTATOS [GET]
contatosRouter.get("/contatos", async (req, res) => {
    const lista = await Contato.find();
    res.json(lista);
});

contatosRouter.get("/contatos/:id", async (req, res) => {
    const contato = await Contato.findById(req.params.id).select("-__v");

    if (contato) {
        res.json(contato);
    } else {
        res.status(404).json({ message: "Contato não encontrado." });
    }
});

// ATUALIZAÇÃO DE CONTATOS [PUT]
contatosRouter.put("/contatos/:id", async (req, res) => {
    const { error, value } = contatoValidation.validate(req.body);

    if (error) {
        res.status(400).json({
            message: "Dados inválidos",
            error: error.details[0].message,
        });
        return;
    }

    const { nome, sobrenome, email, telefone, observacoes, favorito } = value;

    try {
        // Ele procura pelo contato indicado pelo ID, se existir ele será atualizado.
        const contato = await Contato.findByIdAndUpdate(req.params.id, {
            nome,
            sobrenome,
            email,
            telefone,
            observacoes,
            favorito,
        });

        if (contato) {
            res.json({ message: "Contato atualizado com sucesso." });
        } else {
            res.status(404).json({ message: "Contato não encontrado." });
        }
    } catch (err) {
        res.status(500).json({
            message: "Erro ao atualizar o contato.",
            error: err,
        });
    }
});

// REMOÇÃO DE CONTATOS [DELETE]
contatosRouter.delete("/contatos/:id", async (req, res) => {
    try {
        const contato = await Contato.findByIdAndDelete(req.params.id);

        if (contato) {
            res.json({ message: "Contato removido com sucesso." });
        } else {
            res.status(404).json({ message: "Contato não encontrado." });
        }
    } catch (err) {
        res.status(500).json({
            message: "Um erro ocorreu ao remover o contato.",
            error: err,
        });
    }
});
