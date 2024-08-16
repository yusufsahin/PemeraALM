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