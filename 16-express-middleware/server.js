import express from 'express';

const PORT = 3001;
const server = express();


/* MIDDLEWARE */ 
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

function logDate(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.path}`);
    next();
};

function logMDW(req, res, next) {
    console.log('Logged');
    next();
};

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

