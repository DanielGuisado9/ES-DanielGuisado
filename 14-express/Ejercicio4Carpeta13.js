import express from 'express';

const server = express();
const PORT = 5000;

server.get('/', (req, res) => {
    console.log('Request accepted');
    res.status(200).send('<html><body><h1>Hello World!</h1></body></html>');
});

server.use((req, res) => {
    res.status(404).send('<h1>Not Found</h1>');
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});