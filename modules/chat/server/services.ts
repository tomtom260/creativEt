import { prisma } from "@/utils/db"
import { NewMessageDTO, ToggleSeenUpdate } from "../types"

export async function createMessage(message: NewMessageDTO) {
  return await prisma.message.create({
    data: message,
  })
}

export async function toggleSeen({ id }: ToggleSeenUpdate) {
  return await prisma.message.update({
    where: {
      id,
    },
    data: {
      seen: true,
    },
  })
}
