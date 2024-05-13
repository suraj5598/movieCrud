import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin';

const JWT_SECRET = process.env.JWT_SECRET || 'AdminSecret';

const authenticator = async (req: any, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing' });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded._id);

    if (!admin) {
      return res.status(401).json({ error: 'Unauthorized: Admin not found' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export default authenticator;
