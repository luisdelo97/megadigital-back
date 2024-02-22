import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Habitacion = db.define("habitacion", {
  habitacionpiso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1, // número entero mayor a 0
      max: 10, // y menor o igual a 10
    },
  },
  habitacionnro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1, // número entero mayor a 0
      max: 20, // y menor o igual a 20
    },
  },
  cantcamas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1, // número entero entre 1
      max: 4, // y 4
    },
  },
  tienetelevision: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  tienefrigobar: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default Habitacion;
