import Habitacion from "../models/Habitacion.js";
import Reserva from "../models/Reserva.js";

const obtenerReservas = async (req, res) => {
  const { personaId } = req.query;
  try {
    const reservas = await Reserva.findAll({
      where: { personaid: Number(personaId) },
    });

    if (reservas.length === 0) {
      return res
        .status(400)
        .json({ msg: "No existen reservas para este usuario." });
    }
    //vamos a agregarle a las reservas los datos de las habitaciones que le correspondan
    for (const reserva of reservas) {
      const habitacion = await Habitacion.findOne({
        where: { id: reserva.habitacionid },
      });
      reserva.dataValues.habitacionpiso = habitacion.habitacionpiso;
      reserva.dataValues.habitacionnro = habitacion.habitacionnro;
      reserva.dataValues.cantcamas = habitacion.cantcamas;
      reserva.dataValues.tienetelevision = habitacion.tienetelevision;
      reserva.dataValues.tienefrigobar = habitacion.tienefrigobar;
    }
    res.status(200).json(reservas);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error al obtener reservas." });
  }
};

export default obtenerReservas;
