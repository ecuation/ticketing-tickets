import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';
import jwt from 'jsonwebtoken';

const generateId = () => {
    return new mongoose.Types.ObjectId().toHexString();
}

const createTicket = async (title: string, price: number, userId: string) => {
    return await Ticket.build({
        title: title,
        price: price,
        userId: userId
    }).save();
};

const session = async (userId?: string, email?: string) => {
    const payload = {
        id: userId ?? '67f88bcb5346cb36bbfe9d6',
        email: email ?? 'test@test.dev'
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const session = { jwt: token };
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString('base64');
    return [`session=${base64}`];
}

export { generateId, createTicket, session };