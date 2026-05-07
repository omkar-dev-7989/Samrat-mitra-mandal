import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mediaUrl: { type: String, required: true },
  mediaType: { type: String, enum: ['photo', 'video', 'drone'], default: 'photo' },
  year: String,
  category: String,
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
