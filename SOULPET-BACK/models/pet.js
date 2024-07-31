import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Pet = connection.define(
    "pet",
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        porte: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dataNasc: {
            type: DataTypes.DATEONLY,
        },
        // Se quiser gerar a primary key com o nome da sua escolha
        /*
    idPets: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    }*/
    }
    // Se quiser nomear a tabela:
    //{tableName: "pets"}
);
