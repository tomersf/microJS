import request from 'supertest'

import app from '../../app'
import httpStatus from 'http-status'

const email = "test@test.com"
const password = "1234"

it('returns a 201 on successful signup', () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email,
            password,
        })
        .expect(httpStatus.CREATED)
})

it('returns a 400 with an invalid email', () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtest.com',
            password
        })
        .expect(httpStatus.BAD_REQUEST)
})

it('returns a 400 with an invalid password', () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email,
            password: '123',
        })
        .expect(httpStatus.BAD_REQUEST)
})

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email
        })
        .expect(httpStatus.BAD_REQUEST)
    return request(app)
        .post('/api/users/signup')
        .send({
            password
        })
        .expect(httpStatus.BAD_REQUEST)
})


it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password,
        })
        .expect(httpStatus.CREATED)

    return request(app)
        .post('/api/users/signup')
        .send({
            email,
            password
        })
        .expect(httpStatus.BAD_REQUEST)
})

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password,
        })
        .expect(httpStatus.CREATED)

    expect(response.get('Set-Cookie')).toBeDefined()
})