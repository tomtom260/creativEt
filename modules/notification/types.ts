import { Prisma } from "@prisma/client"

export type TCreateNotifcation = Prisma.NotificationUncheckedCreateInput

export type TGetNotifcation = Prisma.NotificationGetPayload<{
  include: {
    notifiedBy: true
  }
}>
