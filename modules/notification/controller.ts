import { createNotifcations, updateNotifcations } from "./server"
import { TCreateNotifcation } from "./types"

export async function createNotifcationController(data: TCreateNotifcation) {
  const notification = await createNotifcations(data)
  pusherServer.trigger(
    `notifications-${notification?.userId}`,
    "notification:new",
    notification
  )
  return notification
}

export async function dismissNotifcationController(id: string) {
  return await updateNotifcations(id, {
    seen: true,
  })
}
