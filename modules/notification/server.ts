import { prisma } from "@/utils/db"
import { Prisma } from "@prisma/client"
import { TCreateNotifcation } from "./types"

export async function getNotifcations(userId: string) {
  return await prisma.notification.findMany({
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

export async function createNotifcations({
  jobsId,
  userId,
  ...data
}: TCreateNotifcation) {
  const { id } = await prisma.notification.create({
    data: {
      ...data,
      job: {
        connect: {
          id: jobsId as string,
        },
      },
      User: {
        connect: {
          id: userId,
        },
      },
    },
  })
  return await prisma.notification.findUnique({
    include: {
      job: {
        include: {
          employer: true,
        },
      },
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
      job: {
        include: {
          employer: true,
        },
      },
    },
    where: {
      id,
    },
    data,
  })
}
