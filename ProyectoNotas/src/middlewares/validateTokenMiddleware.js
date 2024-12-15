import jwt from 'jsonwebtoken';
import config from '../config.js';

const JWT_SECRET = config.security.JWT_SECRET;

const validateTokenMiddleware = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token not provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

export {validateTokenMiddleware as default};