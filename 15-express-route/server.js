import express from 'express';

const PORT = 3001;
const server = express();

/**MIDDLEWARE */
server.use(express.json());
server.use(express.urlencoded({}));

server.get('/headers', function(req, res) {
    const{ mycustomheader } = req.headers;
    res.status(200).send(mycustomheader);
});

server.get('/params/:name', function(req, res) {
    const { name } = req.params;
    res.status(200).send(`Hello ${name}`);
});

server.get('/query', function(req, res) {
    const { name = 'world', age } = req.query;
    res.status(200).send(`Hello ${name}${age ? `, you are ${age} years old` : ''}`);   
});

server.post('/body/:key', function(req, res) {
    const {body, params: {key} }= req;
    res.status(200).send(body[key]);
});

server.use('*', (req, res) => {
    res.status(404).send('Not Found');
});

server.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
});










