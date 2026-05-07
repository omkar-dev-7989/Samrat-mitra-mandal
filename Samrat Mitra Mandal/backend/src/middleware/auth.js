import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { isDbReady } from '../utils/dbState.js';
import { memoryStore } from '../utils/memoryStore.js';

export async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Missing token' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = isDbReady()
      ? await User.findById(payload.id).select('-passwordHash')
      : memoryStore.users.find((item) => item.id === payload.id || item._id === payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}
