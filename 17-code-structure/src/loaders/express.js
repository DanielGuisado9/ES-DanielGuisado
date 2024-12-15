import express from 'express';

export default function(server){
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    return server;

    const PORT = 3001;
const server = express();


/* MIDDLEWARE */ 
server.use(logDate);

/* ROUTES */
server.get('/middleware', logDate, function(req, res) {
    console.log('controller');
    res.status(200).send({message: 'middleware' });
});

server.get('/error', function(req, res, next) {
    try{
        throw new Error('Boom!!');
    } catch(error) {
        next(error);
    }
});

server.use('*' ,(req, res) => {
    res.status(404).send('Not Found');
});

server.use((error, req, res, next) => {
    const status = error.status || 500;
    console.log(`[${status}] ${error.message}`);
    res.status(status || 500).send({
        code: status,
        message: error.message
    });
    });

server.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
});

}
