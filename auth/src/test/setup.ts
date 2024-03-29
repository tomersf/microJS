import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'

import app from '../app'
import { Env } from '@tomersftickets/common'
import httpStatus from 'http-status'

declare global {
    var signin: () => Promise<string[] | undefined>;
}

let mongo: MongoMemoryServer
beforeAll(async () => {
    Env.set('JWT_KEY', 'test')
    mongo = await MongoMemoryServer.create()
    const mongoUri = mongo.getUri()

    await mongoose.connect(mongoUri, {})

})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()
    for (let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});


global.signin = async () => {
    const email = 'test@test.com'
    const password = '1234'

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(httpStatus.CREATED)

    const cookie = response.get('Set-Cookie')

    return cookie;
}