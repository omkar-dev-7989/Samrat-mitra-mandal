import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  message: { type: String, required: true },
  priority: { type: String, enum: ['normal', 'important', 'urgent'], default: 'normal' },
  active: { type: Boolean, default: true },
  expiresAt: Date
}, { timestamps: true });

export const Announcement = mongoose.model('Announcement', announcementSchema);
