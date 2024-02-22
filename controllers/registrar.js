import Persona from "../models/Persona.js";

const registrar = async (req, res) => {
  const { nombrecompleto, correo, telefono, nrodocumento } = req.body;
  // {
  //       nombrecompleto: "Jime",
  //       correo: "jime@gmail.com",
  //       telefono: "0981611611",
  //       nrodocumento: 5197179,
  // }
  try {
    const existeCedula = await Persona.findOne({
      where: { nrodocumento },
    }); // SELECT * FROM persona WHERE nrodocumento = $nrodocumento;

    if (existeCedula) {
      const error = new Error("Cedula ya registrada");
      return res.status(400).json({ msg: error.message });
    }

    const existeCorreo = await Persona.findOne({
      where: { correo },
    }); // SELECT * FROM persona WHERE correo = $correo;

    if (existeCorreo) {
      const error = new Error("Correo ya registrado");
      return res.status(400).json({ msg: error.message });
    }

    const newPersona = await Persona.create({
      nombrecompleto,
      correo,
      telefono,
      nrodocumento,
    });
    res
      .status(200)
      .json({ msg: `Persona creada: ${newPersona.nombrecompleto}` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error al registrar persona." });
  }
};

export default registrar;
