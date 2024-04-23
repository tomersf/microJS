import request from "supertest";
import app from "../../app";
import { Ticket } from "../../models/ticket";
import httpStatus from "http-status";


it('fetches the order', async () => {
    const ticket = Ticket.build({
        price: 20,
        title: 'concert',
    })
    await ticket.save();
    const cookie = await global.signin();

    const response = await request(app)
        .post('/api/orders')
        .set('Cookie', cookie)
        .send({ ticketId: ticket.id })
        .expect(httpStatus.CREATED);

    const order = await request(app)
        .get(`/api/orders/${response.body.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(httpStatus.OK);

    expect(order.body.id).toEqual(response.body.id);
})

it('returns error if one user tries to fetch other order', async () => {
    const ticket = Ticket.build({
        price: 20,
        title: 'concert',
    })
    await ticket.save();
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/orders')
        .set('Cookie', cookie)
        .send({ ticketId: ticket.id })
        .expect(httpStatus.CREATED);

    const order = await request(app)
        .get(`/api/orders/${response.body.id}`)
        .set('Cookie', global.signin())
        .send()
        .expect(httpStatus.UNAUTHORIZED);
})