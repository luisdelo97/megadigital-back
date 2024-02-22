import Reserva from "../models/Reserva.js";

const eliminarReserva = async (req, res) => {
  const { id } = req.params;

  try {
    const reservaEliminada = await Reserva.destroy({
      where: { id },
    });
    if (reservaEliminada) {
      res.status(200).send(`Entidad con ID ${id} eliminada correctamente.`);
    } else {
      res.status(404).send("Entidad no encontrada.");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Error al eliminar la entidad.");
  }
};

export default eliminarReserva;
