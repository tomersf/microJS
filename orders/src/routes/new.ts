import express, { Request, Response } from 'express';
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@tomersftickets/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { getEnv } from '../util/env';
import { Order } from '../models/order';
import httpStatus from 'http-status';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();


router.post('/api/orders',
    requireAuth,
    [
        body('ticketId').not().isEmpty().withMessage('TicketId must be provided')
    ],
    validateRequest, async (req: Request, res: Response) => {
        const { ticketId } = req.body

        const ticket = await Ticket.findById(ticketId)
        if (!ticket) {
            throw new NotFoundError()
        }

        const isReserved = await ticket.isReserved()
        if (isReserved) {
            throw new BadRequestError('Ticket is already reserved')
        }

        const expiration = new Date()
        expiration.setSeconds(expiration.getSeconds() + parseInt(getEnv('EXPIRATION_TIME_IN_SECONDS')))

        const order = Order.build({
            userId: req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt: expiration,
            ticket
        })
        await order.save()

        new OrderCreatedPublisher(natsWrapper.client).publish({
            id: order.id,
            status: order.status,
            userId: order.userId,
            expiresAt: order.expiresAt.toISOString(),
            ticket: {
                id: ticket.id,
                price: ticket.price
            }
        })

        res.status(httpStatus.CREATED).send(order)
    })




export { router as newOrderRouter }