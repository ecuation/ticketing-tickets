import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

let mongo: any;

declare global {
    var signin: () => Promise<string[]>;
};

beforeAll(async () => {
    process.env.JWT_KEY = 'asdf';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri, {});
});

global.signin = async () => {
    const payload = {
        id: '67f88bcb5346cb36bbfe9d6',
        email: 'test@test.dev'
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const session = { jwt: token };
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString('base64');
    return [`session=${base64}`];

};