import validadorFechayMonto from "../helpers/validadorFechayMonto.js";
import Habitacion from "../models/Habitacion.js";
import Reserva from "../models/Reserva.js";

const actualizarReserva = async (req, res) => {
  const { id } = req.params;
  const {
    fechaentrada,
    fechasalida,
    habitacionid,
    habitacionpiso,
    habitacionnro,
    cantcamas,
    tienetelevision,
    tienefrigobar,
  } = req.body;
  try {
    const reserva = await Reserva.findByPk(id);

    if (!reserva) {
      return res.status(400).json({ meg: "Reserva no encontrada..." });
    }

    const habitacion = await Habitacion.findByPk(reserva.habitacionid);

    if (!habitacion) {
      return res.status(400).json({ meg: "Habitacion no encontrada..." });
    }

    // Actualiza los campos necesarios

    //actualizamos habitacion
    habitacion.habitacionpiso = habitacionpiso ?? habitacion.habitacionpiso;
    habitacion.habitacionnro = habitacionnro ?? habitacion.habitacionnro;
    habitacion.cantcamas = cantcamas ?? habitacion.cantcamas;
    habitacion.tienetelevision = tienetelevision ?? habitacion.tienetelevision;
    habitacion.tienefrigobar = tienefrigobar ?? habitacion.tienefrigobar;
    //actualizamos reserva
    reserva.fechareserva = new Date();
    reserva.fechaentrada = fechaentrada ?? reserva.fechaentrada;
    reserva.fechasalida = fechasalida ?? reserva.fechasalida;

    //recalcular montoreserva
    // Calcular el monto reserva, y la fechaentrada y fechasalida
    const { montoreserva, entrada, salida, hoy } = validadorFechayMonto(
      reserva.fechaentrada,
      reserva.fechasalida
    );
    reserva.montoreserva = montoreserva ?? reserva.montoreserva;

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

    // Guarda los cambios
    await habitacion.save();
    await reserva.save();

    res.status(200).json({
      msg: "Reserva actualizada exitosamente.",
      nuevaReserva: reserva,
      nuevaHabitacion: habitacion,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error al actualizar la reserva.");
  }
};

export default actualizarReserva;
