import { Prisma } from "@prisma/client"

export type TCreateNotifcation =
  Prisma.NotificationUncheckedCreateWithoutJobInput &
    Prisma.NotificationUncheckedCreateWithoutUserInput

export type TGetNotifcation = Prisma.NotificationGetPayload<{
  include: {
    job: {
      include: {
        employer: true
      }
    }
  }
}>
