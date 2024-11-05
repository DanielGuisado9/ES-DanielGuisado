import express from 'express';

const server = express();
const PORT = 3000;

server.get('/', (req, res) => {
    const name = req.query.name || 'World';
    res.status(200).send(`Hello ${name}!`);
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});