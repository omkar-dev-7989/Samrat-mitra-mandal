import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  day: String,
  date: Date,
  time: String,
  type: String,
  location: String,
  description: String,
  rsvpCount: { type: Number, default: 0 },
  published: { type: Boolean, default: true }
}, { timestamps: true });

export const Event = mongoose.model('Event', eventSchema);
