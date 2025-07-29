import { prisma } from '../lib/db.js'

export const usersService = {
  getAllUsers: async () => await prisma.user.findMany(),

  getUserById: async (id) => await prisma.user.findUnique({ where: id }),

  createUser: async (data) => await prisma.user.create({ data: data }),
}
