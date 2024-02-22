import express from "express";
import autenticar from "../controllers/autenticar.js";
import registrar from "../controllers/registrar.js";
import obtenerReservas from "../controllers/obtenerReservas.js";
import reservar from "../controllers/reservar.js";
import actualizarReserva from "../controllers/actualizarReserva.js";
import eliminarReserva from "../controllers/eliminarReserva.js";

const router = express.Router();

router.post("/", autenticar);

router.post("/registrar", registrar);

router.get("/home/reserva", obtenerReservas);
router.post("/home/reserva", reservar);
router.put("/home/reserva/:id", actualizarReserva);
router.delete("/home/reserva/:id", eliminarReserva);

export default router;
