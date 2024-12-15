const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory user storage
let users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
];

// Helper function to find user by ID
const findUserById = (id) => users.find(user => user.id === parseInt(id));

// CRUD Routes for /users

// GET /users - List all users
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// GET /users/:id - Get user by ID
app.get('/users/:id', (req, res) => {
    const user = findUserById(req.params.id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// POST /users - Create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /users/:id - Update a user by ID
app.put('/users/:id', (req, res) => {
    const user = findUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    user.name = name;
    user.email = email;
    res.status(200).json(user);
});

// PATCH /users/:id - Partially update a user by ID
app.patch('/users/:id', (req, res) => {
    const user = findUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    res.status(200).json(user);
});

// DELETE /users/:id - Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Unit Tests - Jest Example (tests/users.test.js)
/**
 * Example test structure (Run using Jest)
 *
 * const request = require('supertest');
 * const app = require('../app');
 *
 * describe('Users API', () => {
 *     test('GET /users should return all users', async () => {
 *         const res = await request(app).get('/users');
 *         expect(res.statusCode).toBe(200);
 *         expect(res.body).toHaveLength(2);
 *     });
 *
 *     // More tests for other routes
 * });
 */
