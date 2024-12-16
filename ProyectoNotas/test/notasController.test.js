import { createNote, deleteNote, uploadNotes, getNotes, updateNote } from '../src/controllers/notasController.js';
import fs from 'fs';
import path from 'path';

jest.mock('fs');
jest.mock('path');

describe('notasController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createNote', () => {
        it('should create a note successfully', () => {
            const req = {
                body: {
                    name: 'testNote',
                    content: 'This is a test note'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            fs.writeFile.mockImplementation((filePath, content, callback) => {
                callback(null);
            });

            createNote(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Nota creada con éxito' });
        });

        it('should return an error if name or content is missing', () => {
            const req = {
                body: {
                    name: '',
                    content: ''
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            createNote(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Nombre y contenido son requeridos' });
        });
    });

    describe('deleteNote', () => {
        it('should delete a note successfully', () => {
            const req = {
                params: {
                    name: 'testNote'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            fs.unlink.mockImplementation((filePath, callback) => {
                callback(null);
            });

            deleteNote(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Nota eliminada con éxito' });
        });

        it('should return an error if the note does not exist', () => {
            const req = {
                params: {
                    name: 'nonExistentNote'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            fs.unlink.mockImplementation((filePath, callback) => {
                callback(new Error('File not found'));
            });

            deleteNote(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Nota no encontrada' });
        });
    });

    describe('uploadNotes', () => {
        it('should upload notes successfully', () => {
            const req = {
                files: [
                    { originalname: 'note1.note' },
                    { originalname: 'note2.note' }
                ]
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            uploadNotes(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Notas subidas con éxito' });
        });
    });

    describe('getNotes', () => {
        it('should get all notes successfully', () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            fs.readdir.mockImplementation((dir, callback) => {
                callback(null, ['note1.note', 'note2.note']);
            });

            getNotes(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ notes: ['note1', 'note2'] });
        });
    });

    describe('updateNote', () => {
        it('should update a note successfully', () => {
            const req = {
                params: {
                    name: 'testNote'
                },
                body: {
                    content: 'Updated content'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            fs.writeFile.mockImplementation((filePath, content, callback) => {
                callback(null);
            });

            updateNote(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Nota actualizada con éxito' });
        });

        it('should return an error if name or content is missing', () => {
            const req = {
                params: {
                    name: ''
                },
                body: {
                    content: ''
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            updateNote(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Nombre y contenido son requeridos' });
        });
    });
});