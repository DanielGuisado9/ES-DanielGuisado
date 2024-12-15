import request from 'supertest';
import app from '../src/app.js';

describe('Notas API', () => {
    it('debe recoger todas las notas', async () => {
        const response = await request(app).get('/notas');
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(Array);
    });

    it('debe crear una nueva nota', async () => {
        const newNote = { name: 'Nota1', content: 'Contenido de la nota 1' };
        const response = await request(app).post('/api/notas').send(newNote);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Nota creada correctamente');
    });

    it('debe devolver un error al crear una nota sin contenido', async () => {
        const newNote = { name: 'Nota2' };
        const response = await request(app).post('/api/notas').send(newNote);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Nombre y contenido de la nota son obligatorios');
    });

    it('debe devolver un error 404 para una nota que no existe', async () => {
        const response = await request(app).get('/api/notas/Nota Inexistente');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Nota no encontrada');
    });
});