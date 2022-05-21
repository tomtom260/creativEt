import { prisma } from "@/utils/db"
import moment from "moment"

export async function getTotalLikes(id: string) {
  return prisma.likes.findMany({
    where: {
      content: {
        userId: id,
      },
    },
  })
}

export async function getTotalLikesLastMonth(id: string) {
  return prisma.likes.findMany({
    where: {
      content: {
        userId: id,
      },
      likedAt: {
        lte: moment().startOf("month").toDate(),
      },
    },
  })
}

export async function getMostLikedContent(id: string) {
  const contents = await prisma.content.findMany({
    include: {
      _count: {
        select: {
          likes: true,
        },
      },
    },
    where: {
      userId: id,
    },
  })
  return contents.sort((a, b) => b._count.likes - a._count.likes)[0]
}

export async function getLikesGroupedDay(id: string) {
  const data: {
    close: number
    date: string
  }[] = []
  await (
    await getTotalLikes(id)
  ).forEach((like) => {
    const date = moment(like.likedAt).format(" YYYY-MMM-DD")
    const index = data.findIndex((datum) => datum.date === date)
    if (index === -1) {
      data.push({
        date,
        close: 1,
      })
    } else {
      data[index].close++
    }
  })
  return data
}
