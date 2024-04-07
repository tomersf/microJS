import request from 'supertest'
import app from '../../app'
import httpStatus from 'http-status'


it('fetch a list of tickets ', async () => {
    await Promise.all([createTicket(), createTicket(), createTicket()])
    const response = await request(app).get('/api/tickets').send().expect(httpStatus.OK)
    expect(response.body.length).toEqual(3)
})


function createTicket() {
    return request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: 'great title!',
        price: 20
    })
}