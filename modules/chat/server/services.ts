import { prisma } from "@/utils/db"
import { createNewMessageParams, ToggleSeenUpdate } from "../types"

export async function createMessage(message: createNewMessageParams) {
  return await prisma.message.create({
    data: message,
    include: {
      room: true,
    },
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
      Message: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
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

export async function getMessage(id: string) {
  return await prisma.message.findUnique({
    where: {
      id,
    },
  })
}

export async function getLastMessage(id: string) {
  return await prisma.room.findUnique({
    where: {
      id,
    },
    include: {
      Message: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  })
}
