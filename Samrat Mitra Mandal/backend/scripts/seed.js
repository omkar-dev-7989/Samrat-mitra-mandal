import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { writeFile } from 'node:fs/promises';
import { connectDb } from '../src/config/db.js';
import { User } from '../src/models/User.js';
import { Event } from '../src/models/Event.js';
import { Announcement } from '../src/models/Announcement.js';
import { GalleryItem } from '../src/models/GalleryItem.js';
import { LiveStream } from '../src/models/LiveStream.js';

const events = [
  { day: 'Day 1', title: 'Sthapana Sohala', date: '2026-09-14', time: '9:00 AM', type: 'Ritual' },
  { day: 'Day 3', title: 'Maha Aarti & Prasad', date: '2026-09-16', time: '8:00 PM', type: 'Aarti' },
  { day: 'Day 7', title: 'Dhol Tasha Sandhya', date: '2026-09-20', time: '8:30 PM', type: 'Procession' }
];

async function seed() {
  try {
    await connectDb(process.env.MONGO_URI);
  } catch (error) {
    await writeFile(new URL('../.seed-memory.json', import.meta.url), JSON.stringify({ seededAt: new Date().toISOString(), mode: 'memory', reason: error.message }, null, 2));
    console.warn(`MongoDB unavailable. Wrote memory seed marker and continuing: ${error.message}`);
    process.exit(0);
  }
  await Promise.all([User.deleteMany(), Event.deleteMany(), Announcement.deleteMany(), GalleryItem.deleteMany(), LiveStream.deleteMany()]);
  await User.create({
    name: 'Samrat Admin',
    email: 'admin@samratmitramandal.org',
    passwordHash: await bcrypt.hash('GanpatiBappa@108', 12),
    role: 'admin'
  });
  await Event.insertMany(events);
  await Announcement.insertMany([
    { message: 'Ganeshotsav 2026 decoration theme unveiling soon' },
    { message: 'Maha Aarti registration opens every evening at 6:00 PM', priority: 'important' }
  ]);
  await GalleryItem.insertMany([
    { title: 'Grand Samrat Stage', mediaUrl: '/images/mandal/grand-stage.jpg', mediaType: 'photo', year: '2025', category: 'Decoration', featured: true },
    { title: 'Sunflower Darshan', mediaUrl: '/images/mandal/sunflower-darshan.jpg', mediaType: 'photo', year: '2025', category: 'Photos', featured: true },
    { title: 'Close-up Blessing', mediaUrl: '/images/mandal/closeup-blessing.jpg', mediaType: 'photo', year: '2025', category: 'Photos', featured: true },
    { title: 'Festival Video Moment', mediaUrl: '/images/mandal/festival-video.mp4', mediaType: 'video', year: '2024', category: 'Videos', featured: true }
  ]);
  await LiveStream.create({ title: 'Samrat Mitra Mandal Live Darshan', embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UC_x5XG1OV2P6uZZ5FSM9Ttw', status: 'online' });
  console.log('Seed complete');
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
