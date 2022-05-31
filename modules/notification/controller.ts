import { createNotifcations } from "./server"
import { TCreateNotifcation } from "./types"

export async function createNotifcationController(data: TCreateNotifcation) {
  const notification = await createNotifcations(data)
  pusherServer.trigger("notifications", "notification:new", notification)
  return notification
}
