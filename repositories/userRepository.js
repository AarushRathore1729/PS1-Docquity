// filepath: /media/aarush1729/0F6307FC0F6307FC/URL-Shorten/repositories/userRepository.js
const prisma = require('../config/prismaClient');

class UserRepository {
  create(userData) {
    return prisma.user.create({
      data: userData
    });
  }

  findAll() {
    return prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  findById(id) {
    return prisma.user.findUnique({
      where: { id }
    });
  }

  updateById(id, updateData) {
    return prisma.user.update({
      where: { id },
      data: updateData
    });
  }

  deleteById(id) {
    return prisma.user.delete({
      where: { id }
    });
  }
}

module.exports = new UserRepository();
