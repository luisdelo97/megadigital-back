const autenticar = async (req, res) => {
  const { email } = req.body;
  //comprobar si el usuario existe
  const usuario = await Veterinario.findOne({ email: email });

  if (!usuario) {
    const error = new Error("Usuario no valido..");
    return res.status(403).json({ msg: error.message });
  }

  res.json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    token: generarJWT(usuario.id),
  });
};

const registrar = async (req, res) => {
  const { email, nombre } = req.body;

  //Prevenir usuarios duplicados
  const existeUsuario = await Veterinario.findOne({ email: email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    //Guardar un nuevo usuario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();
    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};
