import express from 'express';
import multer from 'multer';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import { createNote, deleteNote, uploadNotes, getNotes, updateNote } from '../controllers/notasController.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' }).array('files');

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:name', updateNote);
router.delete('/:name', deleteNote);
router.use((req, res) => {
    res.status(404).send('Not found');
});

router.post('/upload', upload, uploadNotes);

export default router;