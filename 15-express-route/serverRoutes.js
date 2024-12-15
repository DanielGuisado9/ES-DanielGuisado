import express from 'express';
import userRouter from './routes.js';

const PORT = 3001;
const server = express();
const router = express.Router();

/**MIDDLEWARE */
server.use(express.json());
server.use(express.urlencoded({}));

server.get('/headers', function(req, res) {
    const{ mycustomheader } = req.headers;
    res.status(200).send(mycustomheader);
});


/*ROUTES */
server.use(router);




server.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
});










