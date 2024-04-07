import request from 'supertest'
import app from '../../app'
import httpStatus from 'http-status';
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

it('returns 404 if provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app).put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'test',
            price: 20
        })
        .expect(httpStatus.NOT_FOUND)

})

it('returns 401 if user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app).put(`/api/tickets/${id}`)
        .send({
            title: 'test',
            price: 20
        })
        .expect(httpStatus.UNAUTHORIZED)
})

it('returns 401 if user does not own the ticket', async () => {
    const response = await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: 'great title!',
        price: 20
    })

    await request(app).put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'test',
            price: 20
        })
        .expect(httpStatus.UNAUTHORIZED)
})

it('returns 400 if user provides invalid title or price', async () => {
    const cookie = global.signin()

    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title: 'great title!',
        price: 20
    })

    await request(app).put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20
        })
        .expect(httpStatus.BAD_REQUEST)

    await request(app).put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            price: 20
        })
        .expect(httpStatus.BAD_REQUEST)

    await request(app).put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'test',
            price: -20
        })
        .expect(httpStatus.BAD_REQUEST)

    await request(app).put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'test',
        })
        .expect(httpStatus.BAD_REQUEST)
})

it('updates the ticket given valid inputs', async () => {
    const cookie = global.signin()

    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title: 'great title!',
        price: 20
    })

    await request(app).put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'should work!!',
            price: 35
        })
        .expect(httpStatus.OK)

    const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`)
    expect(ticketResponse.body.title).toEqual('should work!!')
    expect(ticketResponse.body.price).toEqual(35)
})

it('publishes an event', async () => {
    const cookie = global.signin()

    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title: 'great title!',
        price: 20
    })

    await request(app).put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'should work!!',
            price: 35
        })
        .expect(httpStatus.OK)

    expect(natsWrapper.client.publish).toHaveBeenCalled()
})
