const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Directorio donde se almacenarán las notas
const notesDir = path.join(__dirname, 'notas');

// Creamos el directorio si no existe
if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}

// Función para mostrar el menú al usuario
function mostrarMenu() {
    console.log(`
    ====== Editor de Notas ======
    1. Crear nueva nota
    2. Editar nota existente
    3. Eliminar nota
    0. Salir
    `);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Selecciona una opción: ', (opcion) => {
        switch (opcion.trim()) {
            case '1':
                crearNota(rl);
                break;
            case '2':
                listarNotas(rl, editarNota);
                break;
            case '3':
                listarNotas(rl, eliminarNota);
                break;
            case '0':
                rl.close();
                console.log('¡Hasta luego!');
                break;
            default:
                console.log('Opción no válida. Inténtalo de nuevo.');
                rl.close();
                mostrarMenu();
                break;
        }
    });
}

// Función para crear una nueva nota
function crearNota(rl) {
    rl.question('Introduce el nombre de la nueva nota: ', (nombreNota) => {
        const filePath = path.join(notesDir, `${nombreNota}.note`);
        console.log('Introduce el contenido de la nota. Deja dos líneas en blanco para finalizar:');

        let contenido = '';
        rl.on('line', (input) => {
            if (input === '' && contenido.endsWith('\n\n')) {
                fs.writeFileSync(filePath, contenido.trim());
                console.log(`Nota "${nombreNota}" guardada.`);
                rl.close();
                mostrarMenu();
            } else {
                contenido += input + '\n';
            }
        });
    });
}

// Función para listar notas
function listarNotas(rl, callback) {
    fs.readdir(notesDir, (err, files) => {
        if (err) {
            console.error('Error al listar las notas.');
            rl.close();
            return;
        }

        const notas = files.filter(file => file.endsWith('.note'));

        if (notas.length === 0) {
            console.log('No hay notas disponibles.');
            rl.close();
            mostrarMenu();
            return;
        }

        console.log('Notas disponibles:');
        notas.forEach((nota, index) => {
            console.log(`${index + 1}. ${nota}`);
        });

        rl.question('Selecciona el número de la nota: ', (numero) => {
            const indice = parseInt(numero) - 1;
            if (indice >= 0 && indice < notas.length) {
                callback(rl, notas[indice]);
            } else {
                console.log('Selección no válida.');
                rl.close();
                mostrarMenu();
            }
        });
    });
}

// Función para editar una nota existente
function editarNota(rl, nota) {
    const filePath = path.join(notesDir, nota);

    console.log(`Editando la nota: ${nota}`);
    const contenidoActual = fs.readFileSync(filePath, 'utf-8');
    console.log('Contenido actual:\n', contenidoActual);

    console.log('Introduce el nuevo contenido. Deja dos líneas en blanco para finalizar:');

    let nuevoContenido = contenidoActual + '\n';

    rl.on('line', (input) => {
        if (input === '' && nuevoContenido.endsWith('\n\n')) {
            fs.writeFileSync(filePath, nuevoContenido.trim());
            console.log(`Nota "${nota}" actualizada.`);
            rl.close();
            mostrarMenu();
        } else {
            nuevoContenido += input + '\n';
        }
    });
}

// Función para eliminar una nota
function eliminarNota(rl, nota) {
    const filePath = path.join(notesDir, nota);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error al eliminar la nota.');
        } else {
            console.log(`Nota "${nota}" eliminada.`);
        }
        rl.close();
        mostrarMenu();
    });
}

// Iniciar el editor de notas
mostrarMenu();
function descomponerURL(url) {
    const urlPattern = /^(https?):\/\/(([^.]+)\.)?([^\/:]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?$/;
    const match = url.match(urlPattern);

    if (!match) {
        console.error('URL no válida.');
        return;
    }

    const [_, protocol, __, subDomain, domainName, folderTree, argumentsFile] = match;

    console.log('Protocol:', protocol);
    console.log('SubDomain:', subDomain || 'N/A');
    console.log('DomainName:', domainName);
    console.log('FolderTree:', folderTree || 'N/A');
    console.log('ArgumentsFile:', argumentsFile || 'N/A');
}

// Ejemplo de uso
const url = 'https://sub.example.com/path/to/file?arg=value';
descomponerURL(url);