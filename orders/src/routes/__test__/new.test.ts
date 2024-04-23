import request from 'supertest'
import mongoose from 'mongoose'
import httpStatus from 'http-status'

import app from '../../app'
import { Order, OrderStatus } from '../../models/order'
import { Ticket } from '../../models/ticket'

it('returns an error if ticket does not exist', async () => {
    const ticketId = new mongoose.Types.ObjectId()
    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId }).expect(httpStatus.NOT_FOUND)
})

it('returns an error if ticket is already reserved', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    })
    await ticket.save()

    const order = Order.build({
        ticket,
        userId: 'XXX',
        status: OrderStatus.Created,
        expiresAt: new Date()
    })
    await order.save()

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId: ticket.id }).expect(httpStatus.BAD_REQUEST)
})

it('reserves a ticket', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    })
    await ticket.save()

    const response = await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId: ticket.id }).expect(httpStatus.CREATED)

    expect(response.body.ticket.id).toEqual(ticket.id)
    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId: ticket.id }).expect(httpStatus.BAD_REQUEST)
})


it.todo('emits an order created event');