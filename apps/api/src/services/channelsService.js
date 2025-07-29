import { prisma } from '../lib/db.js'

export const channelsService = {
  getAllChannels: async () => await prisma.channel.findMany(),

  getOrCreateChannel: async (userAId, userBId) => {
    const [lowId, highId] = [userAId, userBId].sort((a, b) => a - b)

    // 1. Check if it exists
    let channel = await prisma.channel.findUnique({
      where: {
        userAId_userBId: {
          userAId: lowId,
          userBId: highId,
        },
      },
      include: {
        userA: true,
        userB: true,
        messages: {
          include: {
            sender: true,
          },
        },
      },
    })

    // 2. If not, create one
    if (!channel) {
      channel = await prisma.channel.create({
        data: {
          userAId: lowId,
          userBId: highId,
        },
        include: {
          userA: true,
          userB: true,
          messages: {
            include: {
              sender: true,
            },
          },
        },
      })
    }

    return channel
  },
}
