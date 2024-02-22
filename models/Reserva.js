import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Reserva = db.define("reserva", {
  fechareserva: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaentrada: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: new Date().toISOString().slice(0, 10), // Asegura que la fecha de entrada sea después del día actual
    },
  },
  fechasalida: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
      // La validación adicional para asegurar que fechasalida es después de fechaentrada debe ser manejada en la lógica de negocio de la aplicación
    },
  },
  habitacionid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "habitacion", // Nombre de la tabla referenciada
      key: "id", // Clave en la tabla referenciada
    },
  },
  personaid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "persona",
      key: "id",
    },
  },
  montoreserva: {
    type: DataTypes.INTEGER, // Cambiado a INTEGER conforme a tu preferencia
    allowNull: false,
  },
});

export default Reserva;
