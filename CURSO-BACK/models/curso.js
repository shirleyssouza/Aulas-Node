import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Professor } from "./professor.js";
import { Aluno } from "./aluno.js";

export const Curso = connection.define("curso", {
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    turno: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    dataInicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
});

Curso.hasOne(Professor, { onDelete: "CASCADE" });
Professor.belongsTo(Curso);

Curso.hasMany(Aluno, { onDelete: "CASCADE" });
Aluno.belongsTo(Curso);
