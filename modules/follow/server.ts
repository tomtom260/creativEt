import { prisma } from "@/utils/db"
import moment from "moment"

export async function getFollowers(id: string) {
  return prisma.follow.findMany({
    where: {
      followingId: id,
    },
  })
}

export async function getFollowing(id: string) {
  return prisma.follow.findMany({
    where: {
      followerId: id,
    },
  })
}

export async function getFollowersLastMonth(id: string) {
  return prisma.follow.findMany({
    where: {
      followingId: id,
      followedAt: {
        lte: moment().startOf("month").toDate(),
      },
    },
  })
}
