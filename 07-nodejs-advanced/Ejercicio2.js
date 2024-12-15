const fs = require('fs');
const util = require('util');

// Flujo síncrono
try {
    const data = fs.readFileSync('example.txt', 'utf8');
    console.log('Lectura síncrona:', data);
} catch (err) {
    console.error('Error al leer el archivo de forma síncrona:', err);
}

// Flujo asíncrono usando callbacks
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo de forma asíncrona:', err);
    } else {
        console.log('Lectura asíncrona (callback):', data);
    }
});

// Flujo asíncrono usando Promesas
const readFilePromise = util.promisify(fs.readFile);

readFilePromise('example.txt', 'utf8')
    .then(data => {
        console.log('Lectura asíncrona (Promesa):', data);
    })
    .catch(err => {
        console.error('Error al leer el archivo de forma asíncrona (Promesa):', err);
    });

// Flujo asíncrono usando async/await
async function readFileAsync() {
    try {
        const data = await readFilePromise('example.txt', 'utf8');
        console.log('Lectura asíncrona (async/await):', data);
    } catch (err) {
        console.error('Error al leer el archivo de forma asíncrona (async/await):', err);
    }
}

readFileAsync();