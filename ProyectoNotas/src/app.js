import express from 'express';
import dotenv from 'dotenv';
import notasRoutes from './routes/notasRoutes';
import {logger} from './utils/logger.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/notas', notasRoutes);

app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
});

export default app;