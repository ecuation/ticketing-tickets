import request from 'supertest';
import { app } from "../../app";
import { Ticket } from '../../models/ticket';

it('route exists', async () => {
    const response = await request(app)
        .post('/api/tickets/create')
        .send({});

    expect(response.status).not.toEqual(404);
});

it('can`t acces access if user is not signed in', async () => {
    await request(app)
        .post('/api/tickets/create')
        .send({})
        .expect(401);
});

it('can access if user is signed in', async () => {
    const cookie = await global.signin();
    const response = await request(app)
        .post('/api/tickets/create')
        .set('Cookie', cookie)
        .send({});

    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
    const cookie = await global.signin();
    await request(app)
        .post('/api/tickets/create')
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 25

        }).expect(400);
});

it('returns an error if an invalid price is provided', async () => {
    const cookie = await global.signin();
    await request(app)
        .post('/api/tickets/create')
        .set('Cookie', cookie)
        .send({
            title: 'test',
            price: -25

        }).expect(400);
});

it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const cookie = await global.signin();
    await request(app)
        .post('/api/tickets/create')
        .set('Cookie', cookie)
        .send({
            title: 'test',
            price: 25

        }).expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
});