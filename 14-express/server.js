import express from 'express';

const server = express();

server.use('/public',express.static('public'));

server.use('/ping' , (req, res) => {
    res.statusCode = 418;
  res.send('Hello World');
});

server.use('/random' , (req, res) => {
    res.statusCode = 418;
  res.send(`<h1>${Math.random()*100}</h1>`);
});

server.use('/random' , (req, res) => {
    res.statusCode = 404;
  res.send(`<h1>Not Found</h1>`);
});

server.listen(3000, () => {
  console.log('Server listening in port 3000');
});

