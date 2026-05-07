import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  amount: { type: Number, required: true, min: 1 },
  category: { type: String, enum: ['Annadan', 'Decoration', 'Social Work', 'Festival Support'], required: true },
  status: { type: String, enum: ['pledged', 'created', 'paid', 'failed'], default: 'pledged' },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  receiptNo: String
}, { timestamps: true });

export const Donation = mongoose.model('Donation', donationSchema);
