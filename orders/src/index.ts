import mongoose from "mongoose"

import app from "./app"
import { getEnv, validateEnvVariables } from "./util/env"
import { natsWrapper } from "./nats-wrapper"
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener"
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener"


const start = async () => {
    validateEnvVariables()
    const dbUri = getEnv('DB_URL')
    const natsClusterID = getEnv('NATS_CLUSTER_ID')
    const natsClientID = getEnv('NATS_CLIENT_ID')
    const natsUri = getEnv('NATS_URL')
    try {
        await natsWrapper.connect(natsClusterID, natsClientID, natsUri)
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!')
            process.exit()
        })
        process.on('SIGINT', () => natsWrapper.client.close())
        process.on('SIGTERM', () => natsWrapper.client.close())

        new TicketCreatedListener(natsWrapper.client).listen()
        new TicketUpdatedListener(natsWrapper.client).listen()
        await mongoose.connect(dbUri)
        console.log('connected to mongodb!')
    } catch (err) {
        console.error(err)
    }
    app.listen(3000, () => {
        console.log('listening on port 3000')
    })
}

start()