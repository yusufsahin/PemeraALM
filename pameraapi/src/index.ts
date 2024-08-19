import 'reflect-metadata'; // This should be the first import
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './config/inversify.config';

// Controllers and Middleware
import './controllers/NoteController';
import './controllers/AuthController';
import { errorHandler } from './middlewares/errorHandler';
import { authMiddleware } from './middlewares/authMiddleware';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pamera-app';

// Connect to MongoDB
mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});

// Create the server with Inversify container
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(express.json());
    app.use(helmet());
    app.use(authMiddleware); // Apply the auth middleware globally before the routes
});

server.setErrorConfig((app) => {
    app.use(errorHandler);
});

// Build and start the server
const app = server.build();
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
