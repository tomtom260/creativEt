import { Message } from "@prisma/client"

export type NewMessageDTO = Omit<Message, "createdAt" | "id" | "seen">

export type ToggleSeenUpdate = {
  id: string
}
