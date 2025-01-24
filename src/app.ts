import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/create';
import { showTicketRouter } from './routes/show';
import { NotFoundError, currentUser, errorHandler } from '@ticketingx/common';

const app = express();
app.set('trust proxy', true);
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorHandler(err, req, res, next);
});

export { app };