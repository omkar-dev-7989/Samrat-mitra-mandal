import bcrypt from 'bcryptjs';

const passwordHash = await bcrypt.hash('GanpatiBappa@108', 12);

export const memoryStore = {
  users: [
    {
      _id: 'demo-admin',
      id: 'demo-admin',
      name: 'Samrat Admin',
      email: 'admin@samratmitramandal.org',
      passwordHash,
      role: 'admin',
      active: true
    }
  ],
  events: [
    { _id: 'event-1', day: 'Day 1', title: 'Sthapana Sohala', date: '2026-09-14', time: '9:00 AM', type: 'Ritual', published: true },
    { _id: 'event-2', day: 'Day 3', title: 'Maha Aarti & Prasad', date: '2026-09-16', time: '8:00 PM', type: 'Aarti', published: true },
    { _id: 'event-3', day: 'Day 7', title: 'Dhol Tasha Sandhya', date: '2026-09-20', time: '8:30 PM', type: 'Procession', published: true }
  ],
  gallery: [
    { _id: 'gallery-1', title: 'Grand Samrat Stage', mediaUrl: '/images/mandal/grand-stage.jpg', mediaType: 'photo', year: '2025', category: 'Decoration', featured: true },
    { _id: 'gallery-2', title: 'Sunflower Darshan', mediaUrl: '/images/mandal/sunflower-darshan.jpg', mediaType: 'photo', year: '2025', category: 'Photos', featured: true },
    { _id: 'gallery-3', title: 'Close-up Blessing', mediaUrl: '/images/mandal/closeup-blessing.jpg', mediaType: 'photo', year: '2025', category: 'Photos', featured: true },
    { _id: 'gallery-4', title: 'Festival Video Moment', mediaUrl: '/images/mandal/festival-video.mp4', mediaType: 'video', year: '2024', category: 'Videos', featured: true }
  ],
  announcements: [
    { _id: 'announcement-1', message: 'Ganeshotsav 2026 decoration theme unveiling soon', active: true, priority: 'normal' },
    { _id: 'announcement-2', message: 'Maha Aarti registration opens every evening at 6:00 PM', active: true, priority: 'important' }
  ],
  donations: [],
  volunteers: [],
  liveStream: {
    _id: 'stream-1',
    title: 'Samrat Mitra Mandal Live Darshan',
    provider: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UC_x5XG1OV2P6uZZ5FSM9Ttw',
    status: 'online',
    autoRefreshSeconds: 60
  }
};

export function createMemoryItem(collection, payload) {
  const item = {
    _id: `${collection}-${Date.now()}`,
    ...payload,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  memoryStore[collection].unshift(item);
  return item;
}

export function updateMemoryItem(collection, id, payload) {
  const items = memoryStore[collection];
  const index = items.findIndex((item) => item._id === id || item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...payload, updatedAt: new Date().toISOString() };
  return items[index];
}
