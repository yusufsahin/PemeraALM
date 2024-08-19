import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export function generateToken(user: IUser): string {
    const secret = process.env.JWT_SECRET as string;

    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles ? user.roles.map(role => (role as any).name) : []
    }, secret, { expiresIn: '1h' });
}

export function verifyToken(token: string): IUser | null {
    const secret = process.env.JWT_SECRET as string;

    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    try {
        return jwt.verify(token, secret) as IUser;
    } catch (err) {
        if (err instanceof Error) {  // Type narrowing to Error
            console.error('Token verification failed:', err.message);
        } else {
            console.error('An unknown error occurred during token verification');
        }
        return null;
    }
}

