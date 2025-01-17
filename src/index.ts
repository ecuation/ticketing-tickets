import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { createRouter } from './routes/create';

const app = express();
app.set('trust proxy', true);
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(createRouter);

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});
