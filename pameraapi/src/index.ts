import 'reflect-metadata'; // This should be the first import
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer } from './server';
import { container } from './config/inversify.config';
import { ModelDefaultSeeder } from './seeder/ModelDefaultSeeder';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pamera-app';
const PORT = process.env.PORT || 3500;

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        // Initialize seed data
        const modelDefaultSeeder = container.get<ModelDefaultSeeder>(ModelDefaultSeeder);
        await modelDefaultSeeder.seedDefaults();

        // Create and start the server
        const app = createServer();
        const server = app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });

        // Graceful shutdown
        const gracefulShutdown = () => {
            console.log('Shutting down gracefully...');
            server.close(() => {
                mongoose.connection.close(false).then(() => {
                    console.log('MongoDB connection closed.');
                    process.exit(0);
                });
            });
        };

        process.on('SIGTERM', gracefulShutdown);
        process.on('SIGINT', gracefulShutdown);
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });
