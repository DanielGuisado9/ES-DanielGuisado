const fs = require('fs');

const path = './example.txt';

// Leer un fichero de manera síncrona
try {
    const data = fs.readFileSync(path, 'utf8');
    console.log('Lectura síncrona:', data);
} catch (err) {
    console.error('Error en la lectura síncrona:', err);
}

// Leer un fichero de manera asíncrona
fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
        console.error('Error en la lectura asíncrona:', err);
        return;
    }
    console.log('Lectura asíncrona:', data);
});