import pusher from "@/utils/pusher"
import { NewMessageDTO, ToggleSeenUpdate } from "../types"
import { createMessage, toggleSeen } from "./services"

export async function createNewMessage(newMessage: NewMessageDTO) {
  const message = await createMessage(newMessage)
  pusher.trigger(`chat:${message.roomId}`, "message:new", message)
  return message
}

export async function toggleMessageSeen(id: ToggleSeenUpdate["id"]) {
  const message = await toggleSeen({ id })
  pusher.trigger(`chat:${message.roomId}`, "message:seen", message)
  return message
}
