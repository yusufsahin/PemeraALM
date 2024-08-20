import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';
import dotenv from 'dotenv';
import { IRole } from '../models/Role';
import { IPrivilege } from '../models/Privilege';
import { Types } from 'mongoose';

// Load environment variables from .env file
dotenv.config();

export function generateToken(user: IUser & { roles: (IRole & { privileges: (IPrivilege | Types.ObjectId)[] })[] }): string {
    const secret = process.env.JWT_SECRET as string;

    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const roles = user.roles.map(role => {
        if (isObjectId(role)) {
            throw new Error('Role is not fully populated');
        }
        return {
            name: role.name,
            privileges: role.privileges.map(privilege => {
                if (isObjectId(privilege)) {
                    throw new Error('Privilege is not fully populated');
                }
                return {
                    name: privilege.name,
                };
            }),
        };
    });

    return jwt.sign({
        id: user._id.toHexString(),
        username: user.username,
        email: user.email,
        roles: roles,
    }, secret, { expiresIn: '1h' });
}

function isObjectId(value: any): value is Types.ObjectId {
    return value instanceof Types.ObjectId;
}

export function verifyToken(token: string): IUser | null {
    const secret = process.env.JWT_SECRET as string;

    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    try {
        return jwt.verify(token, secret) as IUser;
    } catch (err) {
        if (err instanceof Error) {
            console.error('Token verification failed:', err.message);
        } else {
            console.error('An unknown error occurred during token verification');
        }
        return null;
    }
}
