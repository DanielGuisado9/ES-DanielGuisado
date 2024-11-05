const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === '/fizzbuzz') {
        const number = parseInt(query.number, 10);
        if (isNaN(number)) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid number');
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

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});