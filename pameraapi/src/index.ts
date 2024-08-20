import 'reflect-metadata'; // This should be the first import
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer } from './server';
import { container } from './config/inversify.config';
import { ModelDefaultSeeder } from './seeder/ModelDefaultSeeder';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pamera-app';

// Connect to MongoDB
mongoose.connect(MONGO_URI).then(async () => {
    console.log('Connected to MongoDB');

    // Initialize seed data
    const modelDefaultSeeder = container.get<ModelDefaultSeeder>(ModelDefaultSeeder);
    await modelDefaultSeeder.seedDefaults();

    // Create and start the server
    const app = createServer();
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
}).catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
