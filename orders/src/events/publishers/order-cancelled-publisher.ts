import { OrderCancelledEvent, Publisher, Subjects } from "@tomersftickets/common";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}