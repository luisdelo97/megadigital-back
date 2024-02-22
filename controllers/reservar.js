import { Op } from "sequelize";
import validadorFechayMonto from "../helpers/validadorFechayMonto.js";
import Habitacion from "../models/Habitacion.js";
import Reserva from "../models/Reserva.js";

const reservar = async (req, res) => {
  const {
    habitacionpiso,
    habitacionnro,
    cantcamas,
    tienetelevision,
    tienefrigobar,
    fechaentrada,
    fechasalida,
    personaId,
  } = req.body;
  try {
    // Paso 1: Identificar si existe esa habitacion
    let habitacion = await Habitacion.findOne({
      where: {
        habitacionpiso,
        habitacionnro,
        cantcamas,
      },
    });
    if (!habitacion) {
      // Si no se encuentra la habitación, crearemos una habitacion
      habitacion = await Habitacion.create({
        habitacionpiso,
        habitacionnro,
        cantcamas,
        tienetelevision,
        tienefrigobar,
      });
    }

    // Verificar que la fecha de entrada sea mayor al día actual y calcular el montoreserva
    const { montoreserva, entrada, salida, hoy } = validadorFechayMonto(
      fechaentrada,
      fechasalida
    );

    if (entrada <= hoy) {
      return res
        .status(400)
        .json({ msg: "La fecha de entrada debe ser mayor al día actual." });
    }
    if (salida <= entrada) {
      return res.status(400).json({
        msg: "La fecha de salida debe ser mayor a la fecha de entrada.",
      });
    }

    // Verificar disponibilidad de la habitación
    const ocupacion = await Reserva.findOne({
      where: {
        habitacionid: habitacion.id,
        [Op.or]: [
          { fechaentrada: { [Op.between]: [entrada, salida] } },
          { fechasalida: { [Op.between]: [entrada, salida] } },
        ],
      },
    });

    if (ocupacion) {
      return res.status(400).json({
        msg: "La habitación no está disponible en las fechas seleccionadas.",
      });
    }

    // Crear la reserva
    const nuevaReserva = await Reserva.create({
      fechareserva: hoy,
      fechaentrada: entrada,
      fechasalida: salida,
      habitacionid: habitacion.id,
      personaid: Number(personaId),
      montoreserva,
    });

    res.status(200).json({ msg: "Reserva creada exitosamente.", nuevaReserva });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error al crear la reserva." });
  }
};
export default reservar;
