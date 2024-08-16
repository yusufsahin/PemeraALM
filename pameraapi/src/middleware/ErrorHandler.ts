import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({ error: message });
}

export class NotFoundError extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 404;
    }
}

export class ValidationError extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 400;
    }
}
