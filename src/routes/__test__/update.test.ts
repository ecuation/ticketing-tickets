import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { session, generateId, createTicket } from '../../test/helpers/testHelper';

it('returns 404 if ticket does not exists', async () => {
    const coockieSession = await session('123');
    const id = generateId();
    const response = await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', coockieSession)
        .send({
            title: 'test',
            price: 25
        });
    expect(response.status).toEqual(404);
});

it('returns a 401 if user is not authenticated', async () => {
    const ticket = await createTicket('concert', 20, '123');
    const response = await request(app)
        .put(`/api/tickets/${ticket.id}`)
        .send({
            title: 'test',
            price: 25
        });
    expect(response.status).toEqual(401);
});

it('returrns a 401 if user does not own the ticket', async () => {
    const ticket = await createTicket('concert', 20, '1234');
    const response = await request(app)
        .put(`/api/tickets/${ticket.id}`)
        .set('Cookie', await session('123'))
        .send({
            title: 'test',
            price: 25
        });
    expect(response.status).toEqual(401);
});

it('returns a 400 if user provides invalid title or price', async () => {
    const ticket = await createTicket('concert', 20, '1234');
    const response = await request(app)
        .put(`/api/tickets/${ticket.id}`)
        .set('Cookie', await session('123'))
        .send({
            title: '',
            price: 25
        });
    expect(response.status).toEqual(400);
});

it('updates the ticket provided valid inputs', async () => {
    const ticket = await createTicket('concert', 20, '123');
    const response = await request(app)
        .put(`/api/tickets/${ticket.id}`)
        .set('Cookie', await session('123'))
        .send({
            title: 'test update',
            price: 25
        });
    expect(response.status).toEqual(200);

    const updatedTicket = await Ticket.findById(ticket.id);
    expect(updatedTicket!.title).toEqual('test update');

});
