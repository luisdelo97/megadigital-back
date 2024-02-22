import Persona from "../models/Persona.js";

const obtenerPersona = async (req, res) => {
  const { personaId } = req.query;
  try {
    const persona = await Persona.findOne({
      where: { id: Number(personaId) },
    });

    if (!persona) {
      return res.status(400).json({ msg: "No existe esta persona." });
    }

    res.json(persona);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error al obtener persona." });
  }
};

export default obtenerPersona;
