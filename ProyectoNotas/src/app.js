import express from 'express';
import dotenv from 'dotenv';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { logger } from './utils/logger.js';
import notasRoutes from './routes/notasRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.originalUrl}`);
    next();
});

// Ruta para servir la documentación de Swagger
const documentationPath = path.resolve('./src/Documentation/Documentation.yaml');
const documentationSwagger = yaml.load(fs.readFileSync(documentationPath, 'utf8'));

app.use('/openapi-doc', swaggerUi.serve, swaggerUi.setup(documentationSwagger));

// Rutas de la aplicación
app.use(notasRoutes);

app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
});

export default app;