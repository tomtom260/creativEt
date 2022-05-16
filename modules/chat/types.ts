import { Message, Room } from "@prisma/client"

export type NewMessageDTO = Omit<
  Message,
  "createdAt" | "id" | "seen" | "senderId"
>

export type createNewMessageParams = Omit<Message, "createdAt" | "id" | "seen">

export type ToggleSeenUpdate = {
  id: string
}
export type NewRoomDTO = string[]
