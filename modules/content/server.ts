import { Likes, Profile, Tags, Transaction, View } from "@prisma/client"
import { prisma } from "@/utils/db"
import { Content } from "types/content"
import { User } from "types/user"
import { ErrorObject } from "types/error"

export async function getContents(userId?: string, creatorId?: string) {
  if (!userId) {
    return []
  }
  const contents = await prisma.content.findMany({
    include: {
      tags: true,
      createdBy: true,
      likes: true,
      Transaction: true,
      View: true,
      _count: {
        select: { likes: true, View: true },
      },
    },
    where: {
      createdBy: {
        id: creatorId,
      },
    },
  })

  console.log(contents)

  return await Promise.all(
    contents.map(async (content: Exclude<typeof contents[number], void>) => {
      return await addProfileToContentCreator(content, userId)
    })
  )
}

export async function getLikedContents(userId: string) {
  const contents = await prisma.content.findMany({
    include: {
      tags: true,
      createdBy: true,
      likes: true,
      Transaction: true,
      View: true,
      _count: {
        select: { likes: true, View: true },
      },
    },
    where: {
      likes: {
        some: {
          userId,
        },
      },
    },
  })
  return await Promise.all(
    contents.map(async (content: Exclude<typeof contents[number], void>) => {
      return await addProfileToContentCreator(content, userId)
    })
  )
}

export async function getBoughtContents(userId: string) {
  const contents = await prisma.content.findMany({
    include: {
      tags: true,
      createdBy: true,
      likes: true,
      Transaction: true,
      View: true,
      _count: {
        select: { likes: true, View: true },
      },
    },
    where: {
      Transaction: {
        some: {
          buyerId: userId,
        },
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
      View: true,
      _count: {
        select: { likes: true, View: true },
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
  const { location, username, bio } = (await prisma?.profile.findUnique({
    where: {
      userId: content.userId,
    },
  })!) as Profile

  const contentWithProfile: ContentWithProfile & {
    likes?: Likes[]
    _count?: number
  } = { ...content }

  contentWithProfile.createdBy = {
    ...content.createdBy,
    location,
    username,
    bio,
  }
  contentWithProfile.views = content._count.View
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
  delete contentWithProfile.View
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
      View: View[]
      Transaction: Transaction[]
      _count: {
        likes: number
        View: number
      }
    }
