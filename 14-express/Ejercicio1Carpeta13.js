import express from 'express';

const server = express();


server.use('/public', express.static('public'));


server.get('/', (req, res) => {
    console.log('Request accepted');
    res.send('Hello World!\n');
});


server.listen(4000, () => {
    console.log('Server listening on port 4000');
});