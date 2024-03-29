import mongoose from "mongoose"

import app from "./app"
import { getEnv, validateEnvVariables } from "./utils/env"


const start = async () => {
    validateEnvVariables()
    let dbUri = getEnv('DB_URL')
    try {
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