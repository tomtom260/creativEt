import { Profile } from "@prisma/client"
import { prisma } from "@/utils/db"

export async function getContents(userId: string) {
  const contents = await prisma.content.findMany({
    include: {
      tags: true,
      createdBy: true,
      likes: true,
      _count: {
        select: { likes: true },
      },
    },
  })
  await Promise.all(
    contents.map(async (content: Exclude<typeof contents[number], void>) => {
      const { location, username } = (await prisma?.profile.findUnique({
        where: {
          userId: content.userId,
        },
      })!) as Profile
      content.createdBy = { ...content.createdBy, location, username }
      content.totalLikes = content._count.likes
      content.isLikedByCurrentUser = content.likes.some(
        like => like.userId === userId
      )

      delete content._count
      delete content.likes
    })
  )
  return contents
}
