import { prisma } from "@/utils/db"
import moment from "moment"

export async function CreateView(contentId: string, userId: string) {
  return await prisma.view.create({
    data: {
      userId,
      contentId,
    },
  })
}

export async function getTotalViews(userId: string) {
  return await prisma.view.findMany({
    where: {
      content: {
        userId,
      },
    },
  })
}

export async function getViewsGroupedDay(id: string) {
  const data: {
    close: number
    date: string
  }[] = []
  await (
    await getTotalViews(id)
  ).forEach((view) => {
    const date = moment(view.createdAt).format(" YYYY-MMM-DD")
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

export async function getMostViewedContent(id: string) {
  const contents = await prisma.content.findMany({
    include: {
      _count: {
        select: {
          View: true,
        },
      },
    },
    where: {
      userId: id,
    },
  })
  return contents.sort((a, b) => b._count.View - a._count.View)[0]
}
