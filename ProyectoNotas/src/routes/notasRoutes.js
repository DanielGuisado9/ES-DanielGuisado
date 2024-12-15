import express from 'express';
import multer from 'multer';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware';
import { createNote, deleteNote, uploadNotes, getNotes, updateNote } from '../controllers/notasController';

const router = express.Router();

const upload = multer({ dest: 'uploads/' }).array('files');

router.get('/', validateTokenMiddleware, getNotes);
router.post('/', validateTokenMiddleware, createNote);
router.put('/:name', validateTokenMiddleware, updateNote);
router.delete('/:name', validateTokenMiddleware, deleteNote);
router.use((req, res) => {
    res.status(404).send('Not found');
});

router.post('/upload', validateTokenMiddleware,upload, uploadNotes);

export default router;