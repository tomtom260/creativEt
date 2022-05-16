import { pusherServer } from "@/utils/pusher"
import { createNewMessageParams, NewRoomDTO, ToggleSeenUpdate } from "../types"
import {
  createMessage,
  createRoom,
  getMessagesByRoomId,
  getRoom,
  toggleSeen,
} from "./services"

export async function createNewMessage(newMessage: createNewMessageParams) {
  const message = await createMessage(newMessage)
  pusherServer.trigger(
    `presence-room-${message.roomId}`,
    "message:new",
    message
  )
  return message
}

export async function getMessagesWithRoomId(id: string) {
  const messages = await getMessagesByRoomId(id)
  return messages
}

export async function toggleMessageSeen(id: ToggleSeenUpdate["id"]) {
  const message = await toggleSeen({ id })
  pusherServer.trigger(`room:${message.roomId}`, "message:seen", message)
  return message
}

export async function getRoomWithUsers(members: string[]) {}

export async function createNewRoom(members: NewRoomDTO) {
  return await createRoom(members)
}

export async function getAllRooms(id: string) {
  return await getRoom(id)
}
