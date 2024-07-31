import { config } from "dotenv";
config(); // Carrega as variáveis do .env para a nossa aplicação

import { Sequelize } from "sequelize";

// Objeto usado na conexão com o banco de dados
export const connection = new Sequelize(
    process.env.DB_NAME, // acessa o valor da variável DB_NAME
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

export async function authenticate(connection) {
    // tentar a conexão com o banco mysql
    try {
        await connection.authenticate();
        console.log("Conexão foi feita com sucesso!");
    } catch (error) {
        // se houver erro na conexão
        console.log("Um erro aconteceu: ", error);
    }
}
