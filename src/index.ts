import { app } from './app';
import mongoose from 'mongoose';

const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT env not defined');
    }

    if(!process.env.MONGO_URI) { 
        throw new Error('MONGO_URI env not defined');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to tickets MongoDb ${process.env.MONGO_URI}`);
    } catch (error) {
        console.error(error);    
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!');
    });
};

start();
