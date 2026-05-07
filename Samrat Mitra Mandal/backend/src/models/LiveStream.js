import mongoose from 'mongoose';

const liveStreamSchema = new mongoose.Schema({
  provider: { type: String, enum: ['youtube', 'facebook'], default: 'youtube' },
  embedUrl: { type: String, required: true },
  status: { type: String, enum: ['online', 'offline', 'scheduled'], default: 'scheduled' },
  autoRefreshSeconds: { type: Number, default: 60 },
  title: String
}, { timestamps: true });

export const LiveStream = mongoose.model('LiveStream', liveStreamSchema);
