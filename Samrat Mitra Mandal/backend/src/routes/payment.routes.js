import { Router } from 'express';
import Razorpay from 'razorpay';
import { z } from 'zod';
import { Donation } from '../models/Donation.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { isDbReady } from '../utils/dbState.js';
import { memoryStore, updateMemoryItem } from '../utils/memoryStore.js';

const router = Router();
const orderSchema = z.object({ donationId: z.string() });

router.post('/razorpay/order', asyncHandler(async (req, res) => {
  const { donationId } = orderSchema.parse(req.body);
  const donation = isDbReady()
    ? await Donation.findById(donationId)
    : memoryStore.donations.find((item) => item._id === donationId);
  if (!donation) return res.status(404).json({ message: 'Donation not found' });

  if (!isDbReady() || process.env.RAZORPAY_KEY_ID?.includes('replace')) {
    const order = { id: `order_demo_${Date.now()}`, amount: donation.amount * 100, currency: 'INR', receipt: donation.receiptNo };
    if (!isDbReady()) updateMemoryItem('donations', donationId, { status: 'created', razorpayOrderId: order.id });
    return res.json({ order, keyId: process.env.RAZORPAY_KEY_ID, demo: true });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

  const order = await razorpay.orders.create({
    amount: donation.amount * 100,
    currency: 'INR',
    receipt: donation.receiptNo,
    notes: { category: donation.category, donor: donation.name }
  });

  donation.status = 'created';
  donation.razorpayOrderId = order.id;
  await donation.save();
  res.json({ order, keyId: process.env.RAZORPAY_KEY_ID });
}));

export default router;
