import { Router } from 'express';
import { z } from 'zod';
import { Event } from '../models/Event.js';
import { GalleryItem } from '../models/GalleryItem.js';
import { Announcement } from '../models/Announcement.js';
import { LiveStream } from '../models/LiveStream.js';
import { Donation } from '../models/Donation.js';
import { Volunteer } from '../models/Volunteer.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { isDbReady } from '../utils/dbState.js';
import { createMemoryItem, memoryStore } from '../utils/memoryStore.js';

const router = Router();

const donationSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal('')),
  amount: z.number().min(1),
  category: z.enum(['Annadan', 'Decoration', 'Social Work', 'Festival Support'])
});

const volunteerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal('')),
  skills: z.array(z.string()).default([]),
  availability: z.string().optional(),
  bloodDonation: z.boolean().default(false)
});

router.get('/events', asyncHandler(async (req, res) => {
  if (!isDbReady()) return res.json(memoryStore.events.filter((item) => item.published));
  const items = await Event.find({ published: true }).sort({ date: 1 });
  res.json(items);
}));

router.get('/gallery', asyncHandler(async (req, res) => {
  if (!isDbReady()) {
    const items = req.query.year ? memoryStore.gallery.filter((item) => item.year === req.query.year) : memoryStore.gallery;
    return res.json(items);
  }
  const filter = req.query.year ? { year: req.query.year } : {};
  const items = await GalleryItem.find(filter).sort({ createdAt: -1 }).limit(60);
  res.json(items);
}));

router.get('/announcements', asyncHandler(async (req, res) => {
  if (!isDbReady()) return res.json(memoryStore.announcements.filter((item) => item.active));
  const items = await Announcement.find({ active: true }).sort({ createdAt: -1 });
  res.json(items);
}));

router.get('/livestream', asyncHandler(async (req, res) => {
  if (!isDbReady()) return res.json(memoryStore.liveStream);
  const stream = await LiveStream.findOne().sort({ updatedAt: -1 });
  res.json(stream);
}));

router.post('/donations', asyncHandler(async (req, res) => {
  const payload = donationSchema.parse(req.body);
  if (!isDbReady()) return res.status(201).json(createMemoryItem('donations', { ...payload, status: 'pledged', receiptNo: `SMM-${Date.now()}` }));
  const donation = await Donation.create({ ...payload, receiptNo: `SMM-${Date.now()}` });
  res.status(201).json(donation);
}));

router.post('/volunteers', asyncHandler(async (req, res) => {
  const payload = volunteerSchema.parse(req.body);
  if (!isDbReady()) return res.status(201).json(createMemoryItem('volunteers', { ...payload, status: 'pending' }));
  const volunteer = await Volunteer.create(payload);
  res.status(201).json(volunteer);
}));

export default router;
