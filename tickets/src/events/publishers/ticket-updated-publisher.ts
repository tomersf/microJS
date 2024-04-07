import { Publisher, Subjects, TicketUpdatedEvent } from '@tomersftickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

}