const express = require('express');

const app = express();

const adminMiddleware = (req, res, next) => {
    const password = req.headers['password'];
    if (password === 'patata') {
        next();
    } else {
        res.status(401).json({
            error: 'Acceso restringido, por favor, incluya la palabra secreta en el parámetro \'password\' en la cabecera de la petición'
        });
    }
};

app.use('/restricted', adminMiddleware);

app.get('/restricted', (req, res) => {
    res.status(200).send('Bienvenid@, disfrute del contenido');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});