// Importar las dependencias necesarias
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Datos en memoria (pueden ser notas, libros, usuarios, etc.)
let items = [
    { id: 1, name: 'Libro: El Quijote', description: 'Una novela clásica de Miguel de Cervantes' },
    { id: 2, name: 'Nota: Comprar pan', description: 'Recordar comprar pan para la cena' },
    { id: 3, name: 'Usuario: Juan Pérez', description: 'Usuario activo desde 2022' }
];

// Endpoint para recoger la lista de elementos con ordenación, filtrado y paginado
app.get('/items', (req, res) => {
    let { sort, filter, page = 1, limit = 10 } = req.query;

    // Convertir valores numéricos
    page = parseInt(page);
    limit = parseInt(limit);

    // Filtrado
    let filteredItems = items;
    if (filter) {
        filter = filter.toLowerCase();
        filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(filter) ||
            item.description.toLowerCase().includes(filter)
        );
    }

    // Ordenación
    if (sort) {
        const [key, order] = sort.split(':'); // Ejemplo: sort=name:asc o sort=name:desc
        filteredItems = filteredItems.sort((a, b) => {
            if (a[key] < b[key]) return order === 'desc' ? 1 : -1;
            if (a[key] > b[key]) return order === 'desc' ? -1 : 1;
            return 0;
        });
    }

    // Paginado
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    // Respuesta con metadata
    res.status(200).json({
        totalItems: filteredItems.length,
        totalPages: Math.ceil(filteredItems.length / limit),
        currentPage: page,
        items: paginatedItems
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
