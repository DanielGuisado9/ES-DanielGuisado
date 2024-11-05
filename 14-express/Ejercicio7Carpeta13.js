import express from 'express';

const server = express();
const PORT = 3000;

server.get('/fizzbuzz', (req, res) => {
    const number = parseInt(req.query.number, 10);
    if (isNaN(number)) {
        res.status(400).send('Invalid number');
        return;
    }

    const result = [];
    for (let i = 1; i <= number; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result.push('FizzBuzz');
        } else if (i % 3 === 0) {
            result.push('Fizz');
        } else if (i % 5 === 0) {
            result.push('Buzz');
        } else {
            result.push(i);
        }
    }

    res.status(200).json(result);
});

server.use((req, res) => {
    res.status(404).send('Not Found');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});