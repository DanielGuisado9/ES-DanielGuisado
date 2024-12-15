import dotenv from 'dotenv';

dotenv.config();

const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    security: {
        JWT_SECRET: process.env.JWT,
    }
};

export default config;