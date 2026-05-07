import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { Event } from '../models/Event.js';
import { GalleryItem } from '../models/GalleryItem.js';
import { Announcement } from '../models/Announcement.js';
import { Donation } from '../models/Donation.js';
import { Volunteer } from '../models/Volunteer.js';
import { LiveStream } from '../models/LiveStream.js';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { isDbReady } from '../utils/dbState.js';
import { createMemoryItem, memoryStore, updateMemoryItem } from '../utils/memoryStore.js';

const router = Router();
router.use(requireAuth, requireRole('admin', 'editor'));

router.get('/stats', asyncHandler(async (req, res) => {
  if (!isDbReady()) {
    return res.json({
      events: memoryStore.events.length,
      donations: memoryStore.donations.length,
      volunteers: memoryStore.volunteers.length,
      announcements: memoryStore.announcements.filter((item) => item.active).length,
      users: memoryStore.users.length
    });
  }
  const [events, donations, volunteers, announcements, users] = await Promise.all([
    Event.countDocuments(),
    Donation.countDocuments(),
    Volunteer.countDocuments(),
    Announcement.countDocuments({ active: true }),
    User.countDocuments()
  ]);
  res.json({ events, donations, volunteers, announcements, users });
}));

router.post('/events', asyncHandler(async (req, res) => {
  if (!isDbReady()) return res.status(201).json(createMemoryItem('events', req.body));
  res.status(201).json(await Event.create(req.body));
}));
router.patch('/events/:id', asyncHandler(async (req, res) => {
  if (!isDbReady()) return res.json(updateMemoryItem('events', req.params.id, req.body));
  res.json(await Event.findByIdAndUpdate(req.params.id, req.body, { new: true }));
}));
router.delete('/events/:id', asyncHandler(async (req, res) => {
  if (!isDbReady()) {
    memoryStore.events = memoryStore.events.filter((item) => item._id !== req.params.id);
    return res.json({ ok: true });
  }
  res.json(await Event.findByIdAndDelete(req.params.id));
}));

router.post('/gallery', asyncHandler(async (req, res) => {
  if (!isDbReady()) return res.status(201).json(createMemoryItem('gallery', req.body));
  res.status(201).json(await GalleryItem.create(req.body));
}));
router.patch('/gallery/:id', asyncHandler(async (req, res) => {
  if (!isDbReady()) return res.json(updateMemoryItem('gallery', req.params.id, req.body));
  res.json(await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true }));
}));

router.post('/announcements', asyncHandler(async (req, res) => {
  if (!isDbReady()) return res.status(201).json(createMemoryItem('announcements', req.body));
  res.status(201).json(await Announcement.create(req.body));
}));
router.patch('/announcements/:id', asyncHandler(async (req, res) => {
  if (!isDbReady()) return res.json(updateMemoryItem('announcements', req.params.id, req.body));
  res.json(await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true }));
}));

router.get('/donations', asyncHandler(async (req, res) => {
  if (!isDbReady()) return res.json(memoryStore.donations);
  res.json(await Donation.find().sort({ createdAt: -1 }).limit(200));
}));
router.patch('/volunteers/:id', asyncHandler(async (req, res) => {
  if (!isDbReady()) return res.json(updateMemoryItem('volunteers', req.params.id, req.body));
  res.json(await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true }));
}));
router.get('/volunteers', asyncHandler(async (req, res) => {
  if (!isDbReady()) return res.json(memoryStore.volunteers);
  res.json(await Volunteer.find().sort({ createdAt: -1 }).limit(200));
}));

router.patch('/livestream', asyncHandler(async (req, res) => {
  if (!isDbReady()) {
    memoryStore.liveStream = { ...memoryStore.liveStream, ...req.body, updatedAt: new Date().toISOString() };
    return res.json(memoryStore.liveStream);
  }
  const current = await LiveStream.findOne();
  const stream = current ? await LiveStream.findByIdAndUpdate(current.id, req.body, { new: true }) : await LiveStream.create(req.body);
  res.json(stream);
}));

router.get('/users', asyncHandler(async (req, res) => {
  if (!isDbReady()) return res.json(memoryStore.users.map(({ passwordHash: _passwordHash, ...user }) => user));
  res.json(await User.find().select('-passwordHash'));
}));

export default router;
