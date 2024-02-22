import express from "express";
import Persona from "./models/Persona.js";
import { Op } from "sequelize";
import {
  actualizarReserva,
  autenticar,
  eliminarReserva,
  obtenerReservas,
  registrar,
  reservar,
} from "./controllers.js";

const router = express.Router();

router.post("/", autenticar);

router.post("/registrar", registrar);

router.get("/home/reserva", obtenerReservas);
router.post("/home/reserva", reservar);
router.put("/home/reserva/:id", actualizarReserva);
router.delete("/home/reserva/:id", eliminarReserva);

export default router;
