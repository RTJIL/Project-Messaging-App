import { prisma } from '../lib/db.js'

export const messagesService = {
  getAllMessages: async () => await prisma.message.findMany(),

  getMessagesById: async (id) => await prisma.message.findUnique({ where: id }),

  createMessage: async (data) => {
    return await prisma.message.create({
      data: data,
      include: {
        sender: true, 
      },
    })
  },
}
