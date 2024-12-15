const winston = require('winston');

const { format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        colorize(),
        printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' })
    ]
});

// Ejemplo de uso
logger.info('Este es un mensaje informativo');
logger.warn('Este es un mensaje de advertencia');
logger.error('Este es un mensaje de error');

module.exports = logger;