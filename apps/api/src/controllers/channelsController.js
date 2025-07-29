import { channelsService } from '../services/channelsService.js'

export const chanenlsController = {
  getAllChannels: async (req, res, next) => {
    try {
      const channels = await channelsService.getAllChannels()
      res.status(200).json(channels)
    } catch (err) {
      next(new Error(`⛔Cannot get all channels: ${err}`))
    }
  },

  getOrCreateChannel: async (req, res, next) => {
    const { userAId, userBId } = req.body

    try {
      const channel = await channelsService.getOrCreateChannel(Number(userAId), Number(userBId))
      res.status(200).json(channel)
    } catch (err) {
      next(new Error(`⛔Cannot get or create channel: ${err}`))
    }
  },
}
