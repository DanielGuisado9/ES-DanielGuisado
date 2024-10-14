// Importa el módulo chalk usando la sintaxis de ES Module
import chalk from 'chalk';

// Función para agregar un cero delante si el número es menor a 10 (para que se vea como 01, 02, etc.)
function formatoDosDigitos(num) {
  return num < 10 ? '0' + num : num;
}

// Función para mostrar la fecha y hora actual
function mostrarFechaYHora() {
  const ahora = new Date();

  // Obtener día, mes, año, horas, minutos y segundos
  const dia = formatoDosDigitos(ahora.getDate());
  const mes = formatoDosDigitos(ahora.getMonth() + 1); // Los meses en JavaScript empiezan desde 0
  const anio = ahora.getFullYear();
  const horas = formatoDosDigitos(ahora.getHours());
  const minutos = formatoDosDigitos(ahora.getMinutes());
  const segundos = formatoDosDigitos(ahora.getSeconds());

  // Formato dd-MM-YYYY HH:mm:ss
  const fecha = `${dia}-${mes}-${anio}`;
  const tiempo = `${horas}:${minutos}:${segundos}`;

  // Si los segundos son 0 o múltiplo de 10, imprime la hora en verde
  if (segundos % 10 === 0) {
    console.log(`${fecha} ${chalk.green(tiempo)}`);
  } else {
    console.log(`${fecha} ${tiempo}`);
  }
}

// Llama a la función cada segundo
setInterval(mostrarFechaYHora, 1000);
