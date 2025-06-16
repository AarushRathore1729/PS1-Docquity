const prisma = require('../config/prismaClient');

class UrlRepository {
  create(urlData) {
    return prisma.shortUrl.create({
      data: urlData
    });
  }
  
  findAll() {
    return prisma.shortUrl.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });
  }

  findById(id) {
    return prisma.shortUrl.findUnique({
      where: { id }
    });
  }

  updateById(id, updateData) {
    return prisma.shortUrl.update({
      where: { id },
      data: updateData
    });
  }

  updateByShortCode(shortCode, updateData) {
    return prisma.shortUrl.update({
      where: { short_code: shortCode },
      data: updateData
    });
  }

  deleteById(id) {
    return prisma.shortUrl.delete({
      where: { id }
    });
  }

  deleteByShortCode(shortCode) {
    return prisma.shortUrl.delete({
      where: { short_code: shortCode }
    });
  }

  findByShortCode(shortCode) {
    return prisma.shortUrl.findUnique({
      where: { short_code: shortCode }
    });
  }
}
module.exports = new UrlRepository();