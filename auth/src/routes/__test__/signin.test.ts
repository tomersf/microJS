import request from 'supertest'

import app from '../../app'
import httpStatus from 'http-status'


it('fails when a email that does not exist is supplied', async () => {
    await request(app).post('/api/users/signin').send({
        email: 'test@Test.com',
        password: '1234'
    })
        .expect(httpStatus.BAD_REQUEST)
});

it('fails when an incorrect password is supplied', async () => {
    await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: '1234'
    })

    await request(app).post('/api/users/signin').send({
        email: 'XXXXXXXXXXXXX',
        password: '12345'
    })
        .expect(httpStatus.BAD_REQUEST)
})

it('responds with a cookie when given valid credentials', async () => {
    await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: '1234'
    })

    const response = await request(app).post('/api/users/signin').send({
        email: 'test@test.com',
        password: '1234'
    })
        .expect(httpStatus.OK)

    expect(response.get('Set-Cookie')).toBeDefined()
})
