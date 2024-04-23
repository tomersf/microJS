import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import { errorHandler, NotFoundError, Env, currentUser } from '@tomersftickets/common'
import { indexOrderRouter } from './routes/index'
import { deleteOrderRouter } from './routes/delete'
import { showOrderRouter } from './routes/show'
import { newOrderRouter } from './routes/new'


const app = express()
app.set('trust proxy', true)

app.use(express.json())
app.use(cookieSession({
    signed: false,
    secure: Env.get('NODE_ENV') !== 'test',
    name: 'session'
}))
app.use(currentUser)

app.use(indexOrderRouter)
app.use(showOrderRouter)
app.use(newOrderRouter)
app.use(deleteOrderRouter)

app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler)


export default app