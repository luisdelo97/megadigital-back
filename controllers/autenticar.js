import Persona from "../models/Persona.js";

const autenticar = async (req, res) => {
  const { nrodocumento } = req.body;
  try {
    // Comprobar si el usuario existe
    const persona = await Persona.findOne({ where: { nrodocumento } });

    if (!persona) {
      const error = new Error("Persona no valida..");
      return res.status(403).json({ msg: error.message });
    }

    // Si el usuario existe y la validación es exitosa, redirigir a la ruta /home
    res.json({
      msg: "Autenticación exitosa",
      redirectUrl: "/home",
      personaId: persona.id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error al autenticar persona." });
  }
};

export default autenticar;
