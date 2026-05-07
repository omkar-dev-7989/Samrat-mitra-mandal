import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { z } from 'zod';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { isDbReady } from '../utils/dbState.js';
import { memoryStore } from '../utils/memoryStore.js';

const router = Router();
const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

router.post('/login', asyncHandler(async (req, res) => {
  const payload = loginSchema.parse(req.body);
  const user = isDbReady()
    ? await User.findOne({ email: payload.email.toLowerCase(), active: true })
    : memoryStore.users.find((item) => item.email === payload.email.toLowerCase() && item.active);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(payload.password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const id = user.id || user._id.toString();
  const token = jwt.sign({ id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id, name: user.name, email: user.email, role: user.role } });
}));

export default router;
