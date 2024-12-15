import express from 'express';

router.get('/', function(req, res) {
    res.status(200).send('users');
});

router.get('/userId', function(req, res) {
    res.status(200).send('users');
});

router.post('', function(req, res) {
    res.status(200).send('users');
});

outer.delete('', function(req, res) {
    res.status(200).send('users');
});

router.put('', function(req, res) {
    res.status(200).send('users');
});

router.patch('', function(req, res) {
    res.status(200).send('users');
});

export default router;