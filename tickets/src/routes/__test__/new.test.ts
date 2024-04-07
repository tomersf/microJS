import request from 'supertest'
import app from '../../app'
import httpStatus from 'http-status';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('handle POST for /api/tickets', async () => {
    const response = await request(app).post('/api/tickets').send({});
    expect(response.status).not.toEqual(404);
})

it('access only for signed in users', async () => {
    const response = await request(app).post('/api/tickets').send({}).expect(httpStatus.UNAUTHORIZED)
})

it('not returning status of 401 if user is signed in', async () => {
    const response = await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({});
    expect(response.status).not.toEqual(httpStatus.UNAUTHORIZED);
})

it('returns err for invalid title', async () => {
    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: '',
        price: 10,
    })
        .expect(httpStatus.BAD_REQUEST)

    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        price: 10,
    })
        .expect(httpStatus.BAD_REQUEST)
})

it('returns err for invalid price', async () => {
    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: 'Good title!',
        price: -5,
    })
        .expect(httpStatus.BAD_REQUEST)

    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: 'Good title',
    })
        .expect(httpStatus.BAD_REQUEST)
})

it('creates a ticket with valid params', async () => {
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)

    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: 'Good title',
        price: 10,
    }).expect(httpStatus.CREATED)

    tickets = await Ticket.find({})
    expect(tickets.length).toEqual(1)
    expect(tickets[0].price).toEqual(10)
    expect(tickets[0].title).toEqual('Good title')
})


it('publishes an event', async () => {
    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: 'Good title',
        price: 10,
    }).expect(httpStatus.CREATED)

    expect(natsWrapper.client.publish).toHaveBeenCalled()
})