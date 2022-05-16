import { prisma } from "@/utils/db"
import { createNewMessageParams, ToggleSeenUpdate } from "../types"

export async function createMessage(message: createNewMessageParams) {
  return await prisma.message.create({
    data: message,
  })
}

export async function createRoom(members: string[]) {
  return await prisma.room.create({
    data: {
      members: {
        connect: members.map((id) => ({
          id,
        })),
      },
    },
  })
}

export async function getRoom(id: string) {
  return await prisma.room.findMany({
    include: {
      members: {
        include: {
          Profile: true,
        },
      },
    },
    where: {
      members: {
        some: {
          id,
        },
      },
    },
  })
}

export async function getMessagesByRoomId(id: string) {
  return await prisma.message.findMany({
    where: {
      roomId: id,
    },
  })
}

export async function getRoomWithMembers(id: string) {
  return await prisma.room.findMany({
    include: {
      members: true,
    },
    where: {},
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
