import mongoose from "mongoose"

import app from "./app"
import { Env } from '@tomersftickets/common'


const start = async () => {
    Env.validateEnvVariables()
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('connected to mongodb!')
    } catch (err) {
        console.error(err)
    }
    app.listen(3000, () => {
        console.log('listening on port 3000')
    })
}

start()