import { Likes, Profile, Tags, Transaction } from "@prisma/client"
import { prisma } from "@/utils/db"
import { Content } from "types/content"
import { User } from "types/user"
import { ErrorObject } from "types/error"

export async function getContents(userId: string) {
  const contents = await prisma.content.findMany({
    include: {
      tags: true,
      createdBy: true,
      likes: true,
      Transaction: true,
      _count: {
        select: { likes: true },
      },
    },
  })
  return await Promise.all(
    contents.map(async (content: Exclude<typeof contents[number], void>) => {
      return await addProfileToContentCreator(content, userId)
    })
  )
}

export async function getContent(id: string, userId: string) {
  const content = await prisma.content.findUnique({
    include: {
      tags: true,
      createdBy: true,
      likes: true,
      Transaction: true,
      _count: {
        select: { likes: true },
      },
    },
    where: {
      id,
    },
  })

  if (!content) {
    throw {
      message: "content not found",
      statusCode: 404,
    } as ErrorObject
  }

  content.createdBy.isFollowedByCurrentUser = addUserFollowsContentCreator(
    userId,
    content.createdBy.id
  )

  return await addProfileToContentCreator(content, userId)
}

async function addUserFollowsContentCreator(
  followerId: string,
  followingId: string
) {
  return !!(await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  }))
}

async function addProfileToContentCreator(
  content: ContentWithLikesTagsUser,
  userId: string
): Promise<ContentWithProfile> {
  const { location, username } = (await prisma?.profile.findUnique({
    where: {
      userId: content.userId,
    },
  })!) as Profile

  const contentWithProfile: ContentWithProfile & {
    likes?: Likes[]
    _count?: number
  } = { ...content }

  contentWithProfile.createdBy = { ...content.createdBy, location, username }
  contentWithProfile.totalLikes = content._count.likes
  contentWithProfile.isLikedByCurrentUser = content.likes.some(
    (like) => like.userId === userId
  )
  contentWithProfile.isBoughtByCurrentUser = content.Transaction.some(
    (trans) => trans.buyerId === userId
  )

  contentWithProfile.createdBy.isFollowedByCurrentUser =
    await addUserFollowsContentCreator(userId, contentWithProfile.createdBy.id)

  delete contentWithProfile._count
  delete contentWithProfile.likes
  delete contentWithProfile.Transaction
  return contentWithProfile
}

export type ContentWithProfile = ContentWithLikesTagsUser & {
  createdBy: Content["createdBy"] & {
    location: string
    username: string
    isFollowedByCurrentUser: boolean
  }
  isLikedByCurrentUser: boolean
  isBoughtByCurrentUser: boolean
  totalLikes: number
}

type ContentWithLikesTagsUser =
  | Content & {
      tags: Tags[]
      createdBy: User
      likes: Likes[]
      Transaction: Transaction[]
      _count: {
        likes: number
      }
    }
