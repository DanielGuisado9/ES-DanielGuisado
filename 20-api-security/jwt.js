import jwt from 'jsonwebtoken';
import express from 'express';
const app = express();

const mySecret =  'I know your secret';

const token = jwt.sign({
    user: 'Dani',
    role: 'admin',
}, mySecret);

console.log(token);

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ error: 'Token not provided' });

    jwt.verify(token, mySecret, (err, user) => {
     if (err) return res.status(403).json({ error: 'Invalid token' });
     req.user = user;
     next();
});
};

app.use(authenticateToken);

app.get('/protected', (req, res) => {
    res.send('This is a protected route');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});