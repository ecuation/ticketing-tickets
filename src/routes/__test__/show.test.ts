import request from 'supertest';
import { app } from "../../app";
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose';

it('returns 404 if ticket does not exists', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app)
        .get(`/api/tickets/${id}`)
        .send();
    expect(response.status).toEqual(404);

});

it('returns a ticket if one exists', async () => {
    const ticket = await Ticket.build({
        title: 'concert',
        price: 20,
        userId: '123'
    }).save();

    const response = await request(app)
        .get(`/api/tickets/${ticket.id}`)
        .send()
        .expect(200);
});

