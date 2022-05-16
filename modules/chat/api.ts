import axios from "axios"
import { NewMessageDTO, NewRoomDTO, ToggleSeenUpdate } from "./types"

export async function createMessage(newMessage: NewMessageDTO) {
  return await axios.post("/api/chat", newMessage)
}

export async function getMessagesWithRoomId(id: string) {
  return await (
    await axios.get(`/api/chat?id=${id}`)
  ).data
}

export async function createRoom(members: NewRoomDTO) {
  return await axios.post("/api/room", members)
}

export async function toggleMessageSeen({ id }: ToggleSeenUpdate) {
  return await axios.patch("/api/chat", { id })
}
