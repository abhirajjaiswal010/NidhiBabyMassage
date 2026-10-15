import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma.js';
import { getOTPAuthURL, getQRCodeDataURL } from '../src/lib/totp.js';

async function createAdmin() {
  const email = (process.argv[2] || process.env.ADMIN_EMAIL || 'nidhisbabymassage@gmail.com').toLowerCase().trim();
  const password = process.argv[3] || process.env.ADMIN_PASSWORD || 'AdminNidhi@2026';
  const totpSecret = process.env.ADMIN_TOTP_SECRET || 'WV4ACVGUVMK2QQGG2XGWE2NE43P76OGX';

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
