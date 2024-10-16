const fs = require('fs');
const rimraf = require('rimraf');

// Crear el directorio 'files' si no existe
function crear() {
  if (!fs.existsSync('files')) {
    fs.mkdirSync('files');
  }
}

// Crear un archivo JavaScript en el directorio 'files' si no existe
function crearJs(filename) {
    filename = process.argv[1];
    crear(); // Asegurarse de que el directorio 'files' exista
    const filePath = `files/${filename}.js`;
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '', 'utf8');
    }
}
// Crear un subdirectorio dentro del directorio 'files'
function crearCarpeta(folderName) {
  crear(); // Asegurarse de que el directorio 'files' exista
  const folderPath = `files/${folderName}`;
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
}

// Eliminar el directorio 'files' y todo su contenido
function borrar() {
  rimraf.sync('files');
}

// Eliminar todos los archivos JavaScript en el directorio 'files'
function borrarJs() {
  rimraf.sync('files/*.js');
}

// Exportar las funciones para que puedan ser utilizadas desde otros archivos
module.exports = {
  crear,
  crearJs,
  crearCarpeta,
  borrar,
  borrarJs
};