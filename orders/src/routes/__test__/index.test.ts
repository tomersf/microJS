import request from 'supertest'

import { Ticket } from "../../models/ticket"
import app from '../../app'
import httpStatus from 'http-status'

const buildTicket = async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
    })
    await ticket.save()
    return ticket
}

it('fetch orders for a user', async () => {

    const [ticketOne, ticketTwo, ticketThree] = await Promise.all
        ([buildTicket(), buildTicket(), buildTicket()])

    const userOne = global.signin()
    const userTwo = global.signin()

    const [_, { body: orderOne }, { body: orderTwo }] = await Promise.all([request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ ticketId: ticketOne.id })
        .expect(httpStatus.CREATED), request(app)
            .post('/api/orders')
            .set('Cookie', userTwo)
            .send({ ticketId: ticketTwo.id })
            .expect(httpStatus.CREATED), request(app)
                .post('/api/orders')
                .set('Cookie', userTwo)
                .send({ ticketId: ticketThree.id })
                .expect(httpStatus.CREATED)])

    const response = await request(app)
        .get('/api/orders')
        .set('Cookie', userTwo)
        .expect(httpStatus.OK)


    expect(response.body.length).toEqual(2)
    expect(response.body[0].id).toEqual(orderOne.id)
    expect(response.body[1].id).toEqual(orderTwo.id)
})