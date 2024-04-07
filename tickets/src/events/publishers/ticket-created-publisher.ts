import { Publisher, Subjects, TicketCreatedEvent } from '@tomersftickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;

}