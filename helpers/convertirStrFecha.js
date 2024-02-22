function convertirStrAFecha(fechaString) {
  const partes = fechaString.split("-");
  // Resta 1 del mes porque los meses en el objeto Date de JavaScript son 0-indexados (0 = enero, 11 = diciembre)
  const ano = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const dia = parseInt(partes[2], 10);

  // Crea el objeto Date usando el año, mes y día para asegurarte de que se use la medianoche de tu zona horaria local
  const fecha = new Date(ano, mes, dia);

  return fecha;
}

export default convertirStrAFecha;
