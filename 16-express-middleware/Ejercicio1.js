const express = require('express');

const app = express();

const logger = (req, res, next) => {
    res.on('finish', () => {
        const statusCode = res.statusCode;
        if (statusCode >= 200 && statusCode < 300) {
            console.info(`INFO: ${req.method} ${req.originalUrl} ${statusCode}`);
        } else if (statusCode >= 400 && statusCode < 500) {
            console.warn(`WARN: ${req.method} ${req.originalUrl} ${statusCode}`);
        } else if (statusCode >= 500) {
            console.error(`ERROR: ${req.method} ${req.originalUrl} ${statusCode}`);
        }
    });
    next();
};

app.use(logger);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/error', (req, res) => {
    res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});