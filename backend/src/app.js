import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env') });
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import enquiryRoutes from './routes/enquiryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Security: Restrict CORS to authorized frontend origin (or allow same-origin / Vercel previews)
const allowedOrigin = process.env.FRONTEND_ORIGIN;
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || !allowedOrigin || origin === allowedOrigin || origin.includes('localhost') || origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Payload parsers
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Rate Limiter for public form submissions (prevent spam)
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 submissions per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many booking enquiries submitted from this IP. Please try again after 15 minutes.',
  },
});

// Rate Limiter for admin login attempts (prevent brute force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many failed login attempts. Account temporarily locked for 15 minutes.',
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/enquiries', enquiryLimiter, enquiryRoutes);
app.use('/api/admin/enquiries', enquiryRoutes); // Alias supporting both /api/enquiries and /api/admin/enquiries
app.use('/api/auth/login', authLimiter);
app.use('/api/auth', authRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.method} ${req.originalUrl}' not found`,
  });
});

// Global Central Error Handler
app.use(errorHandler);

export default app;
