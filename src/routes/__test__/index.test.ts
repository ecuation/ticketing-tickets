import request from 'supertest';
import { app } from '../../app';
import { createTicket } from '../../test/helpers/testHelper';

it('show a list of tickets', async () => {
    await createTicket('concert', 20, '123');
    await createTicket('concert', 20, '123');
    await createTicket('concert', 20, '123');

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);

    expect(response.body.length).toEqual(3);
});