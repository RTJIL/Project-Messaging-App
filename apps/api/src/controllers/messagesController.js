import { messagesService } from '../services/messagesService.js'

export const messagesController = {
  getAllMessages: async (req, res, next) => {
    try {
      const messages = await messagesService.getAllMessages()
      res.status(200).json(messages)
    } catch (err) {
      next(new Error(`⛔Cannot get all messages: ${err}`))
    }
  },

  getMessagesById: async (req, res, next) => {
    const channelId = req.params.channelId

    try {
      const messages = await messagesService.getMessagesById({ channelId })
      res.status(200).json(messages)
    } catch (err) {
      next(new Error(`⛔Cannot get messages by id: ${err}`))
    }
  },

  createMessage: async (req, res, next) => {
    const { content } = req.body
    const channelId = req.params.channelId
    const senderId = Number(req.user.id)

    console.log(
      `🧾${typeof content}:`,
      `${content} ||`,
      `🧾${typeof channelId}:`,
      `${channelId} ||`,
      `🧾${typeof senderId}:`,
      `${senderId} ||`
    )

    if (isNaN(senderId) || typeof channelId !== 'string') {
      return res.status(400).json({
        error:
          'senderId must be a number and channelId must be a string (uuid)',
      })
    }

    try {
      const message = await messagesService.createMessage({
        content,
        sender: { connect: { id: senderId } },
        channel: { connect: { id: channelId } },
      })
      res.status(200).json(message)
    } catch (err) {
      next(new Error(`⛔Cannot create message: ${err}`))
    }
  },
}


/**
 * Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoicnQiLCJhdmF0YXIiOiJodHRwczovL3B6YXl6ZmthbWJxbnZsenhxbGJiLnN1cGFiYXNlLmNvL3N0b3JhZ2UvdjEvb2JqZWN0L3B1YmxpYy9tZXNzZW5nZXItc20vL2Fub255bS5zdmciLCJpYXQiOjE3NTM3MDk4NTYsImV4cCI6MTc1Mzg4MjY1Nn0.n7tcapnpRqW_Q6AVQtn37UrPOZtcAumshHFwhuuwbltwbbkzuGye-qrJCb6eInG1V9I_jHRC0koHtFqYQnw87jh9jfaS8RbYF0kxGl1E7wUAAdu3ySNSdtKV3qwxaUDN1Chi5f1kzr1-FAB7aPXMo6XaDLRXfuSx_VCICevbj-aklOeEbAf7mjM737O5WwaJEDGo4vrL6iFyiH4T3GW-79LXsFilH83Iv_E68a8ZT0b_crbSNT4ymVFA2daiwDwPRDsmhAQrJCNeExa4f0lKhovpJ4SSz4a-Bq-PbD0EN1uDPROxJH94Uu60IgCPcmZKbMa_ZPk3UFxL7fgaEmV-jQ
 */

/**
 * Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsInVzZXJuYW1lIjoicnRqIiwiYXZhdGFyIjoiaHR0cHM6Ly9wemF5emZrYW1icW52bHp4cWxiYi5zdXBhYmFzZS5jby9zdG9yYWdlL3YxL29iamVjdC9wdWJsaWMvbWVzc2VuZ2VyLXNtLy9hbm9ueW0uc3ZnIiwiaWF0IjoxNzUzNzExNDU5LCJleHAiOjE3NTM4ODQyNTl9.WzS_OZhbWdCygCAlmTxj5YhDmHtUwplH_729-UGcYUBou4JKRCzOrcCpaovz1rdPSmcvHLRygrFEaWreUwJwaPh8eF8bPNvQdfw39a_1ayPvv9IIw4gtMCi7e5MTidA5-Hu8ZqdtG1h84cQ1-WXxCV69g6ohCn5nYz5MihE6JvJLkY2RMBIsza0PKVK8xVyIdQcHa89umtX3byDl44o3joR6SogyFz9DnXb3A8aT2HDtmoXHxbFkFvnLDD46ROOUDtqvnMECdRakvxz6oF9eP-SjSNxFh3U2qMbzq0DAneHNEwuUOgui6EhOBy9WVeFWqRffs_RZZFGlLWEvrCzGtQ
 */