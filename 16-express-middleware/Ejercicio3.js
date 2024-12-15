const express = require('express');

const app = express();

// Middleware para el control de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

// Ejemplo de una ruta que genera un error
app.get('/', (req, res) => {
    throw new Error('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});