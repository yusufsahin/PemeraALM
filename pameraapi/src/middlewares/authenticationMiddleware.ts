import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';
import UserContext from '../utils/UserContext';
import { verifyToken } from '../utils/jwt';

interface AuthRequest extends Request {
    user?: IUser;
}

// List of routes that don't require authentication
const publicRoutes = ['/api/auth/login', '/api/auth/register'];

export const authenticationMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (publicRoutes.includes(req.path)) {
        // Skip authentication for public routes
        return next();
    }

    const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded; // Attach the decoded user to the request
    UserContext.setUserId(decoded.id); // Set the user ID in the global context

    res.on('finish', () => {
        UserContext.clear(); // Clear the user context after the response is finished
    });

    next();
};

