import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'Ejercicio5.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).send('Error loading the HTML file');
        }
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});