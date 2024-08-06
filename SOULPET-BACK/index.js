import { connection, authenticate } from "./config/database.js";
import express from "express";
import { clientesRouter } from "./routes/clientes.js";
import { petsRouter } from "./routes/pets.js";
import cors from "cors";

authenticate(connection).then(() => {
    // Após conectar no banco de dados, ele irá sincronizar os models no banco, ou seja, irá gerar as tabelas caso necessário.

    // force: true => irá dropar tudo e criar do zero novamente
    // recomendado apenas durante o desenvolvimento, se houver dados na tabela serão apagados.
    //connection.sync({ force: true });
    connection.sync();
});

// Definir a aplicação backend em Express
// Recursos pré configurados
const app = express();

// Configurar CORS / Em origin coloque a URL do front end
app.use(cors({ origin: "http://localhost:5173" }));

// Garantir que todas as requisições que tem body sejam lidas como JSON
app.use(express.json());

//Definir os endereços do backend
app.use(clientesRouter);
app.use(petsRouter);

// Rodar a aplicação backend
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
});
