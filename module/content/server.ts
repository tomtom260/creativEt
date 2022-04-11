import { Likes, Profile, Tags } from "@prisma/client"
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

  return await addProfileToContentCreator(content, userId)
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
    like => like.userId === userId
  )

  delete contentWithProfile._count
  delete contentWithProfile.likes
  return contentWithProfile
}

export type ContentWithProfile = ContentWithLikesTagsUser & {
  createdBy: Content["createdBy"] & {
    location: string
    username: string
  }
  isLikedByCurrentUser: boolean
  totalLikes: number
}

type ContentWithLikesTagsUser =
  | Content & {
      tags: Tags[]
      createdBy: User
      likes: Likes[]
      _count: {
        likes: number
      }
    }
