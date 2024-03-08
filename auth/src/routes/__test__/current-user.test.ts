import request from 'supertest'

import app from '../../app'
import httpStatus from 'http-status'


it('responds with details about current user', async () => {
    const cookie = await global.signin()
    const response = await request(app).get('/api/users/currentuser').set('Cookie', cookie).send().expect(httpStatus.OK)
    expect(response.body.currentUser.email).toEqual('test@test.com')

});

it('responds with null if not authenticated', async () => {
    const response = await request(app).get('/api/users/currentuser').send().expect(httpStatus.OK)
    expect(response.body.currentUser).toEqual(null)
})


