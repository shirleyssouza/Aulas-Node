import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Endereco = connection.define("endereco", {
    uf: {
        type: DataTypes.STRING(2),
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING(9),
        allowNull: false,
    },
    rua: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numero: {
        type: DataTypes.STRING(50),
        defaultValue: "S/N", // Valor padrão da coluna
    },
});
