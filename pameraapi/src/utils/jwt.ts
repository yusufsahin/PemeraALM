import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

export function generateToken(user: IUser): string {
    return jwt.sign({ id: user._id, username: user.username, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
}

export function verifyToken(token: string): IUser | null {
    try {
        return jwt.verify(token, 'your_jwt_secret') as IUser;
    } catch (err) {
        return null;
    }
}