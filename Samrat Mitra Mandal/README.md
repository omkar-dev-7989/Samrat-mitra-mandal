# Samrat Mitra Mandal

A modern, premium, responsive Ganeshotsav website inspired by the structure of large temple trust portals: live darshan, donation flows, event schedules, gallery, volunteer registration, social initiatives, multilingual UX, PWA support, and an admin dashboard.

## Stack

- Frontend: React + Vite, Tailwind CSS, Framer Motion, React Router, Lucide icons
- Backend: Node.js + Express
- Database: MongoDB with Mongoose schemas
- Auth: JWT with role-based admin middleware
- Payment: Razorpay order API placeholder ready for live keys
- Streaming: YouTube Live embed support

## Quick Start

```bash
npm install
cp backend/.env.example backend/.env
npm run seed
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000/api`

Demo admin login after seeding:

- Email: `admin@samratmitramandal.org`
- Password: `GanpatiBappa@108`

## Environment

Create `backend/.env` from `backend/.env.example` and set:

- `MONGO_URI`
- `JWT_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `CLIENT_ORIGIN`

## Deployment

### Vercel Frontend

1. Set project root to `frontend`.
2. Build command: `npm run build`.
3. Output directory: `dist`.
4. Set `VITE_API_BASE_URL` to your backend API URL.

### AWS/Render Backend

1. Set project root to `backend`.
2. Start command: `npm start`.
3. Add the environment variables from `.env.example`.
4. Use MongoDB Atlas for production.

## Production Notes

- Replace dummy UPI and Razorpay keys before accepting donations.
- Replace YouTube embed ID with the Mandal livestream.
- Use S3/Cloudinary for gallery uploads in production.
- Configure real push notifications through Firebase Cloud Messaging or Web Push VAPID keys.
- Add real Google Maps API embed once the final Mandal address is confirmed.
