import { prisma } from "@/utils/db"

export async function CreateView(contentId: string, userId: string) {
  return await prisma.view.upsert({
    where: {
      contentId_userId: {
        contentId,
        userId,
      },
    },
    update: {
      count: {
        increment: 1,
      },
    },
    create: {
      userId,
      contentId,
    },
  })
}
