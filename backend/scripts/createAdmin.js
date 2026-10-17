import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env') });
import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma.js';
import { getOTPAuthURL } from '../src/lib/totp.js';

async function createAdmin() {
  const email = (process.argv[2] || process.env.ADMIN_EMAIL || '').toLowerCase().trim();
  const password = process.argv[3] || process.env.ADMIN_PASSWORD;
  const totpSecret = process.env.ADMIN_TOTP_SECRET;

  if (!email || !password || !totpSecret) {
    console.error('❌ Missing credentials. Ensure ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_TOTP_SECRET are set in your local .env file.');
    process.exit(1);
  }

  console.log(`\n🔐 Setting up Admin Account for: ${email}`);

  try {
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const admin = await prisma.admin.upsert({
      where: { email },
      update: { passwordHash },
      create: { email, passwordHash },
    });

    const otpAuthUrl = getOTPAuthURL({
      email,
      issuer: "Nidhi's Baby Massage",
      secret: totpSecret,
    });

    console.log(`\n========================================================`);
    console.log(`✅ Admin Account Configured Successfully!`);
    console.log(`========================================================`);
    console.log(`• ID:       ${admin.id}`);
    console.log(`• Email:    ${admin.email}`);
    console.log(`• Password: ${password}`);
    console.log(`--------------------------------------------------------`);
    console.log(`📲 GOOGLE AUTHENTICATOR SETUP:`);
    console.log(`• Account Name:  Nidhi's Baby Massage (${email})`);
    console.log(`• Secret Key:    ${totpSecret}`);
    console.log(`• Key Type:      Time-based (TOTP, 30s)`);
    console.log(`• Setup URI:     ${otpAuthUrl}`);
    console.log(`========================================================\n`);
  } catch (error) {
    console.error('❌ Failed to create admin account:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
