import { Op } from "sequelize";
import convertirStrAFecha from "./helpers/convertirStrFecha.js";
import Habitacion from "./models/Habitacion.js";
import Persona from "./models/Persona.js";
import Reserva from "./models/Reserva.js";
import validadorFechayMonto from "./helpers/validadorFechayMonto.js";

const autenticar = async (req, res) => {
  const { nrodocumento } = req.body;
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
};

const registrar = async (req, res) => {
  const { nombrecompleto, correo, telefono, nrodocumento } = req.body;
  // {
  //       nombrecompleto: "Jime",
  //       correo: "jime@gmail.com",
  //       telefono: "0981611611",
  //       nrodocumento: 5197179,
  //     }
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

  try {
    const newPersona = await Persona.create({
      nombrecompleto,
      correo,
      telefono,
      nrodocumento,
    });
    res
      .status(200)
      .json({ msg: `usuario creado: ${newPersona.nombrecompleto}` });
  } catch (error) {
    console.log(error);
  }
};

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

const obtenerReservas = async (req, res) => {
  const { personaId } = req.query;
  try {
    const reservas = await Reserva.findAll({
      where: { personaid: Number(personaId) },
    });
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
    res.json(reservas);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error al obtener reservas." });
  }
};

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

    res.json({
      msg: "Reserva actualizada exitosamente.",
      nuevaReserva: reserva,
      nuevaHabitacion: habitacion,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error al actualizar la reserva.");
  }
};

export {
  autenticar,
  registrar,
  reservar,
  obtenerReservas,
  eliminarReserva,
  actualizarReserva,
};
