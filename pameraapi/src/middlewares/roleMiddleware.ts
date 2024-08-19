import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';
import { ObjectId } from 'mongoose';

interface RoleRequest extends Request {
    user?: IUser;
}

export const authorizeRoles = (requiredRoles: string[]) => {
    return (req: RoleRequest, res: Response, next: NextFunction) => {
        if (!req.user || !req.user.roles) {
            console.log('User or roles not defined');
            return res.status(401).json({ message: 'Unauthorized' });
        }

        console.log('User Roles:', req.user.roles);

        const userRoles = req.user.roles
            .filter(role => role != null)
            .map(role => {
                if (typeof role === 'string') {
                    return role;  // It's already a string
                } else if (typeof role === 'object' && 'name' in role) {
                    return (role as { name: string }).name;  // If it's populated with the role object, get the name
                } else {
                    console.log('Role is an ObjectId, but was not populated.');
                    return '';  // Return empty string if the role wasn't populated properly
                }
            });

        console.log('Mapped User Roles:', userRoles);
        console.log('Required Roles:', requiredRoles);

        const hasRole = requiredRoles.some(role => userRoles.includes(role));

        if (!hasRole) {
            console.log('User does not have the required role');
            return res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }

        next();
    };
};

