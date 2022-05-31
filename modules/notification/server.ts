import { prisma } from "@/utils/db"
import { TCreateNotifcation } from "./types"

export async function getNotifcations(userId: string) {
  return prisma.notification.findMany({
    include: {
      job: {
        include: {
          employer: true,
        },
      },
    },
    where: {
      userId,
    },
  })
}

export async function createNotifcations(data: TCreateNotifcation) {
  return prisma.notification.create({
    data,
  })
}
