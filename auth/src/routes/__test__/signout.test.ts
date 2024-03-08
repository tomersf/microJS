import request from 'supertest'

import app from '../../app'
import httpStatus from 'http-status'


it('clears the cookie after signing out', async () => {
    await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: '1234'
    }).expect(httpStatus.CREATED)

    const response = await request(app).post('/api/users/signout').send({}).expect(httpStatus.OK)
    expect(response.get('Set-Cookie')[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
});


