import express from 'express';

const server = express();
const PORT = 5000;

server.get('/hola', (req, res) => {
    console.log('Request accepted');
    res.status(418).send('Soy una tetera Gabri ;)');
});

server.get('/negro', (req, res) => {
    console.log('Request accepted');
    res.send('blanco');
});

server.use((req, res) => {
    res.status(404).send('<h1>Not Found</h1>');
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});