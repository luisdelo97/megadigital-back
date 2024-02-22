import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Persona = db.define("persona", {
  nombrecompleto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nrodocumento: {
    type: DataTypes.INTEGER, // Cambiado a INTEGER
    allowNull: false,
    unique: true, // Asegura que cada nrodocumento sea único en la base de datos.
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegura que cada correo sea único en la base de datos.
  },
  telefono: {
    type: DataTypes.STRING, // Cambiado a INTEGER. Considera usar BIGINT si los números pueden ser largos.
    allowNull: false,
  },
});

export default Persona;
