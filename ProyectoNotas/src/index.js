import app from './app.js';
import config from './config.js';

const PORT = config.app.port;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});