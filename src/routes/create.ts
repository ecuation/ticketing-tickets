import express from 'express';

const router = express.Router();

console.log('hello inside create.ts');

router.get('/api/test', (req, res) => { 
    res.send('Hello World');
});

export { router as createRouter };