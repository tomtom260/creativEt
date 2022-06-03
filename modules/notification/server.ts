import { prisma } from "@/utils/db"
import { Prisma } from "@prisma/client"
import { TCreateNotifcation } from "./types"

export async function getNotifcations(userId: string) {
  return await prisma.notification.findMany({
    include: {
      notifiedBy: true,
    },
    where: {
      userId,
    },
  })
}

export async function createNotifcations(data: TCreateNotifcation) {
  const { id } = await prisma.notification.create({
    data,
  })
  return await prisma.notification.findUnique({
    include: {
      notifiedBy: true,
    },
    where: {
      id,
    },
  })
}

export async function updateNotifcations(
  id: string,
  data: Prisma.NotificationUncheckedUpdateInput
) {
  return await prisma.notification.update({
    include: {
      notifiedBy: true,
    },
    where: {
      id,
    },
    data,
  })
}
