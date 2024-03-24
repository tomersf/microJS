import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import { errorHandler, NotFoundError, Env, currentUser } from '@tomersftickets/common'
import { createTicketRouter } from './routes/new'
import { showTicketRouter } from './routes/show'
import { indexTicketRouter } from './routes'
import { updateTicketRouter } from './routes/update'

const app = express()
app.set('trust proxy', true)

app.use(express.json())
app.use(cookieSession({
    signed: false,
    secure: Env.get('NODE_ENV') !== 'test',
    name: 'session'
}))
app.use(currentUser)

app.use(indexTicketRouter)
app.use(showTicketRouter)
app.use(createTicketRouter)
app.use(updateTicketRouter)

app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler)


export default app