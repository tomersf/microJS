import { OrderCreatedEvent, Publisher, Subjects } from "@tomersftickets/common";


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}