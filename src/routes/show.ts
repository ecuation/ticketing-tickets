import express from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@ticketingx/common';

const router = express.Router();

router.get('/api/tickets/:id', async (req, res, next) => {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        throw new NotFoundError();
    }

    res.send(ticket);
});

export { router as showTicketRouter };