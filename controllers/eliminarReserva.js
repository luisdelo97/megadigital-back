import Reserva from "../models/Reserva.js";

const eliminarReserva = async (req, res) => {
  const { id } = req.params;

  try {
    const reservaEliminada = await Reserva.destroy({
      where: { id },
    });
    if (!reservaEliminada) {
      res.status(404).send("Entidad no encontrada.");
    }
    res.status(200).send(`Entidad con ID ${id} eliminada correctamente.`);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error al eliminar la entidad.");
  }
};

export default eliminarReserva;
