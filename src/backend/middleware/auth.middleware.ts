import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth.util';

const publicRoutes = [
  { path: '/api/users/login', method: 'POST' },
  { path: '/api/users/register', method: 'POST' },
  { path: '/api/users/forgot-password', method: 'POST' },
];

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Check if route is public
  const isPublicRoute = publicRoutes.some(
    route => route.path === req.path && route.method === req.method
  );

  if (isPublicRoute) {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};