const prisma = require('./prismaClient');

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log(`Prisma connected to MongoDB successfully`);
    return prisma;
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;