import 'dotenv/config';
import app from './app.js';
import { prisma } from './lib/prisma.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Verify database connection
    await prisma.$connect();
    console.log('✅ PostgreSQL Database connected successfully via Prisma.');
  } catch (error) {
    console.warn('⚠️ PostgreSQL connection failed on boot. Check DATABASE_URL in .env:', error.message);
    console.warn('ℹ️ API will still serve requests, but database operations will throw until Postgres is running.');
  }

  const server = app.listen(PORT, () => {
    console.log(`🚀 Nidhi's Baby Massage Backend running on http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🔒 Allowed Frontend Origin: ${process.env.FRONTEND_ORIGIN || 'http://localhost:5173'}`);
  });

  // Graceful shutdown handling
  const shutdown = async (signal) => {
    console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
      await prisma.$disconnect();
      console.log('💤 Database connection closed. Server terminated cleanly.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

startServer();
