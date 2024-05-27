import { NotAuthorizedError, NotFoundError, OrderStatus, requireAuth } from '@tomersftickets/common';
import express from 'express';
import { Order } from '../models/order';
import httpStatus from 'http-status';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();


router.delete('/api/orders/:orderId', requireAuth, async (req, res) => {
    const { orderId } = req.params
    const order = await Order.findById(orderId).populate('ticket')
    if (!order) {
        throw new NotFoundError()
    }
    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError()
    }

    order.status = OrderStatus.Cancelled
    await order.save()

    new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        ticket: {
            id: order.ticket.id
        }
    })

    res.status(httpStatus.NO_CONTENT).send(order)
})




export { router as deleteOrderRouter }