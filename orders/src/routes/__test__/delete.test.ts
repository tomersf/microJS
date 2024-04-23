import request from 'supertest'
import app from '../../app'
import { Ticket } from '../../models/ticket'
import httpStatus from 'http-status'
import { Order, OrderStatus } from '../../models/order'

it('marks an order as cancelled', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    })

    await ticket.save()
    const user = global.signin()

    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(httpStatus.CREATED)

    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(httpStatus.NO_CONTENT)

    const updatedOrder = await Order.findById(order.id)
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})


it.todo('emits an order cancelled event')