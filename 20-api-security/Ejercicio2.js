const express = require('express');

const app = express();
const port = 3000;

// Middleware para simular autenticación y roles
const authenticate = (req, res, next) => {
    const user = req.headers['user'];
    if (user) {
        req.user = JSON.parse(user);
    }
    next();
};

const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).send('Acceso denegado');
        }
        next();
    };
};

app.use(authenticate);

app.get('/public', (req, res) => {
    res.send('Acceso público permitido');
});

app.get('/vip', authorize(['user', 'admin']), (req, res) => {
    res.send('Acceso permitido a usuarios registrados');
});

app.get('/admin', authorize(['admin']), (req, res) => {
    res.send('Acceso exclusivo a usuarios con rol admin');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});