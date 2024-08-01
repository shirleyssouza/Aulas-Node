import { Cliente } from "../models/cliente.js";
import { Endereco } from "../models/endereco.js";
import { Router } from "express";

export const clientesRouter = Router();

// Definir os endpoints do backend
// Metodos: GET (leitura), POST (inserção), PUT (alteração), DELETE (remoção)

// Listagem de todos os clientes
clientesRouter.get("/clientes", async (req, res) => {
    // SELECT * FROM clientes;
    const listaClientes = await Cliente.findAll();
    res.json(listaClientes);
});

// Listagem de um cliente especifico (ID = 1)
clientesRouter.get("/clientes/:id", async (req, res) => {
    const cliente = await Cliente.findOne({
        where: { id: req.params.id },
        include: [Endereco], // Juntar os dados do cliente com seu respectivo endereço.
    });

    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({ message: "Cliente não encontrado!" });
    }
});

clientesRouter.post("/clientes", async (req, res) => {
    // Extraimos os dados do body que serão usados na inserção
    const { nome, email, telefone, endereco } = req.body;

    try {
        // Tentativa de inserir o cliente
        await Cliente.create(
            { nome, email, telefone, endereco },
            { include: [Endereco] } // Indicamos que o endereço será salvo e associado ao cliente
        );
        res.json({ message: "Cliente criado com sucesso." });
    } catch (error) {
        // Tratamento caso ocorra algum erro
        // 500 -> internal server error
        res.status(500).json({
            message: "Um erro ocorreu ao inserir cliente.",
        });
    }
});

clientesRouter.put("/clientes/:id", async (req, res) => {
    const idCliente = req.params.id;
    const { nome, email, telefone, endereco } = req.body;

    try {
        const cliente = await Cliente.findOne({ where: { id: idCliente } });

        if (cliente) {
            // Atualiza a linha do endereço que o id do cliente for igual ao id do cliente sendo atualizado.
            await Endereco.update(endereco, {
                where: { clienteID: idCliente },
            });
            await cliente.update({ nome, email, telefone });
            res.json({ message: "Cliente atualizado." });
        } else {
            res.status(404).json({ message: "O cliente não foi encontrado." });
        }
    } catch (error) {
        res.status(500).json({
            message: "Ocorreu um error ao atualizar o cliente.",
        });
    }
});

clientesRouter.delete("/clientes/:id", async (req, res) => {
    const idCliente = req.params.id;

    try {
        const cliente = await Cliente.findOne({ where: { id: idCliente } });

        if (cliente) {
            await cliente.destroy();
            res.json({ message: "Cliente removido com sucesso." });
        } else {
            res.status(404).json({ mesage: "Cliente não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o cliente." });
    }
});
