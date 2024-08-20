import express from 'express';
import helmet from 'helmet';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './config/inversify.config';
import { authenticationMiddleware } from './middlewares/authenticationMiddleware';
import { errorHandler } from './middlewares/errorHandler';

// Function to create and configure the server
export const createServer = (): express.Application => {
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
        app.use(express.json());
        app.use(helmet());
        app.use(authenticationMiddleware); // Apply the auth middleware globally before the routes
    });

    server.setErrorConfig((app) => {
        app.use(errorHandler);
    });

    return server.build();
};
