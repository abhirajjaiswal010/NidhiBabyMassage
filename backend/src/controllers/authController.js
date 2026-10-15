import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { verifyTOTP, getOTPAuthURL, getQRCodeDataURL } from '../lib/totp.js';

const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  totpCode: z.string().trim().optional(),
});

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};

export async function login(req, res, next) {
  try {
    const { email, password, totpCode } = loginSchema.parse(req.body);
    const cleanEmail = email.toLowerCase().trim();

    // 1. Find Admin Account
    const admin = await prisma.admin.findUnique({
      where: { email: cleanEmail },
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email, password, or security code.',
      });
    }

    // 2. Validate Password
    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email, password, or security code.',
      });
    }

    // 3. Validate Google Authenticator TOTP
    const totpSecret = process.env.ADMIN_TOTP_SECRET || 'WV4ACVGUVMK2QQGG2XGWE2NE43P76OGX';

    if (!totpCode || !totpCode.trim()) {
      return res.status(400).json({
        success: false,
        requiresTOTP: true,
        message: 'Google Authenticator 6-digit code is required.',
      });
    }

    const isTotpValid = verifyTOTP(totpCode.trim(), totpSecret, 1);
    if (!isTotpValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid 6-digit code. Check Google Authenticator on your phone.',
      });
    }

    // 4. Generate JWT
    const secret = process.env.JWT_SECRET || 'nidhi_baby_massage_jwt_secret_dev_2026';
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      secret,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, COOKIE_OPTIONS);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      admin: {
        id: admin.id,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
}

// Public or guided 2FA QR code info for initial phone setup
export async function get2FASetupInfo(req, res, next) {
  try {
    const email = (process.env.ADMIN_EMAIL || 'nidhisbabymassage@gmail.com').toLowerCase();
    const totpSecret = process.env.ADMIN_TOTP_SECRET || 'WV4ACVGUVMK2QQGG2XGWE2NE43P76OGX';
    const issuer = "Nidhi's Baby Massage";

    const otpAuthUrl = getOTPAuthURL({ email, issuer, secret: totpSecret });
    const qrCodeDataUrl = await getQRCodeDataURL(otpAuthUrl);

    res.status(200).json({
      success: true,
      email,
      secretKey: totpSecret,
      issuer,
      otpAuthUrl,
      qrCodeDataUrl,
    });
  } catch (error) {
    next(error);
  }
}

export function logout(req, res) {
  res.clearCookie('token', COOKIE_OPTIONS);
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
}

export function getMe(req, res) {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
}
