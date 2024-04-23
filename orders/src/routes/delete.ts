import { NotAuthorizedError, NotFoundError, OrderStatus, requireAuth } from '@tomersftickets/common';
import express from 'express';
import { Order } from '../models/order';
import httpStatus from 'http-status';

const router = express.Router();


router.delete('/api/orders/:orderId', requireAuth, async (req, res) => {
    const { orderId } = req.params
    const order = await Order.findById(orderId)
    if (!order) {
        throw new NotFoundError()
    }
    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError()
    }

    order.status = OrderStatus.Cancelled
    await order.save()

    res.status(httpStatus.NO_CONTENT).send(order)
})




export { router as deleteOrderRouter }