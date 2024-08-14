import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './inversify.config';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Ensure this import is present and not duplicated
import './controllers/NoteController';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/note-taking-app';

mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(express.json());
});

const app = server.build();
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
