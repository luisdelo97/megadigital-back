import convertirStrAFecha from "./convertirStrFecha.js";

const validadorFechayMonto = (fechaentrada, fechasalida) => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Ajustar la hora a medianoche para comparar solo fechas
  const entrada = new Date(convertirStrAFecha(fechaentrada));
  const salida = new Date(convertirStrAFecha(fechasalida));

  const diferenciaTiempo = salida.getTime() - entrada.getTime();
  const diasReserva = diferenciaTiempo / (1000 * 3600 * 24);
  // Calcular el monto de la reserva
  const montoreserva = diasReserva * 120000;
  return { montoreserva, entrada, salida, hoy };
};

export default validadorFechayMonto;
