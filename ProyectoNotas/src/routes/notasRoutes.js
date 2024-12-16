import express from 'express';
import multer from 'multer';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import { createNote, deleteNote, uploadNotes, getNotes, updateNote } from '../controllers/notasController.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' }).array('files');

router.get('/list',validateTokenMiddleware, getNotes);
router.post('/create/:name',validateTokenMiddleware, createNote );
router.put('/edit/:name',validateTokenMiddleware, updateNote);
router.delete('/delete/:name',validateTokenMiddleware, deleteNote);
router.use((req, res) => {
    res.status(404).send('Not found');
});

router.post('/upload', upload, uploadNotes);

export default router;