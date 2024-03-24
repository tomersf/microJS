import mongoose from "mongoose";

interface TicketAttributes {
    title: string;
    price: number;
    userId: string
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attributes: TicketAttributes): TicketDoc;
}

interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    userId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(_, ret) {
            ret.id = ret._id
            delete ret._id
        },
        versionKey: false,
    }
})

ticketSchema.statics.build = (attributes: TicketAttributes) => {
    return new Ticket(attributes)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket }