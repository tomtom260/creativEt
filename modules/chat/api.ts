import { Message, Room } from "@prisma/client"
import axios from "axios"
import { NewMessageDTO, NewRoomDTO, ToggleSeenUpdate } from "./types"

export async function createMessage(newMessage: NewMessageDTO) {
  return await axios.post("/api/chat", newMessage)
}

export async function getMessagesWithRoomId(id: string) {
  return await (
    await axios.get<Room[]>(`/api/chat?id=${id}`)
  ).data
}

export async function createRoom(members: NewRoomDTO) {
  return await axios.post("/api/room", members)
}

export async function toggleMessageSeen({ id }: ToggleSeenUpdate) {
  return await (
    await axios.patch<{ data: Message }>(`/api/chat/${id}`)
  ).data.data
}

export async function getMessage({ id }: ToggleSeenUpdate) {
  return (await axios.get<{ data: Message }>(`/api/chat/${id}`)).data.data
}
