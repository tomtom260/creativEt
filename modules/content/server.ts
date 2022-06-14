import { Likes, Prisma, Profile, Tags, Transaction, View } from "@prisma/client"
import { prisma } from "@/utils/db"
import { Content } from "types/content"
import { User } from "types/user"
import { ErrorObject } from "types/error"
import moment from "moment"

enum FILTERS {
  ALL = "All",
  NEW = "New",
  POPULAR = "Popular",
  FOLLOWING = "Following",
}

export async function boostContent(id: string) {
  const boost = await prisma.boost.findUnique({
    where: {
      contentId: id,
    },
  })
  if (!boost)
    return await prisma.boost.create({
      data: {
        contentId: id,
      },
      include: {
        content: true,
      },
    })

  return await prisma.boost.update({
    include: {
      content: true,
    },
    data: {
      boostedAt: new Date(),
    },
    where: {
      contentId: id,
    },
  })
}
export async function deleteContent(id: string) {
  return await prisma.content.delete({
    where: {
      id,
    },
  })
}

export async function PublishContent(id: string) {
  return await prisma.content.update({
    where: {
      id,
    },
    data: {
      published: true,
    },
  })
}

export async function UpdateContent(
  id: string,
  {
    tags,
    ...data
  }: Omit<Prisma.ContentUpdateInput, "image" | "tags"> & {
    tags: string[]
  }
) {
  return await prisma.content.update({
    where: {
      id,
    },
    data: {
      ...data,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
  })
}

export async function getContents(
  userId?: string,
  creatorId?: string,
  tag?: string,
  filter?: string
) {
  if (!userId) {
    return []
  }
  const contents = await prisma.content.findMany({
    include: {
      tags: true,
      createdBy: {
        include: {
          followers: true,
        },
      },
      likes: true,
      Transaction: true,
      View: true,
      Boost: true,
      _count: {
        select: { likes: true, View: true },
      },
    },
    where: {
      published: true,
      createdBy: {
        id: creatorId,
        following:
          filter === FILTERS.FOLLOWING
            ? {
                some: {
                  id: userId,
                },
              }
            : undefined,
      },
      createdAt:
        filter === FILTERS.NEW
          ? {
              gte: moment().subtract(1, "day").startOf("d").toDate(),
            }
          : undefined,
      tags: tag
        ? {
            some: {
              name: tag,
            },
          }
        : undefined,
    },
  })

  contents.map((content) => {
    content.point = 0

    const viewsByCurrentUser = content.View.filter(
      (view) => view.userId === userId
    ).length
    if (viewsByCurrentUser < parseInt(process.env.NEW_POST as string)) {
      content.point += parseInt(process.env.NEW_POST_POINTS as string)
    } else if (
      viewsByCurrentUser < parseInt(process.env.RECENT_POST as string)
    ) {
      content.point += parseInt(process.env.RECENT_POST_POINTS as string)
    }

    const likes = content._count.likes
    if (likes > parseInt(process.env.POPULAR as string)) {
      content.point += parseInt(process.env.POPULAR_POINTS as string)
    }
  })

  const contentsWithProfile = await Promise.all(
    contents.map(async (content: Exclude<typeof contents[number], void>) => {
      return await addProfileToContentCreator(content, userId)
    })
  )

  contentsWithProfile.map((content) => {
    if (content.isBoosted) {
      content.point += parseInt(process.env.BOOST_POINTS as string)
    }
    if (content.createdBy.isFollowedByCurrentUser) {
      content.point += parseInt(process.env.FOLLOW_POINTS as string)
    }
  })

  contentsWithProfile.sort((a, b) => b.point - a.point)

  if (filter === FILTERS.POPULAR) {
    contentsWithProfile.sort((a, b) => b._count.likes - a._count.likes)
  }

  return contentsWithProfile
}

export async function getLikedContents(userId: string) {
  const contents = await prisma.content.findMany({
    include: {
      tags: true,
      createdBy: true,
      likes: true,
      Transaction: true,
      View: true,
      Boost: true,
      _count: {
        select: { likes: true, View: true },
      },
    },
    where: {
      published: true,
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
      Boost: true,
      _count: {
        select: { likes: true, View: true },
      },
    },
    where: {
      published: true,
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
      Boost: true,
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

export async function getTags(take?: number) {
  return (
    await prisma.tags.findMany({
      select: {
        name: true,
        _count: {
          select: {
            contents: true,
          },
        },
      },
    })
  )
    .filter((tag) => (!take ? true : tag._count.contents))
    .sort((a, b) => b._count.contents - a._count.contents)
    .slice(0, take)
    .map((tag) => tag.name)
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
  contentWithProfile.isBoosted = contentWithProfile?.Boost?.boostedAt
    ? moment().isBefore(
        moment(contentWithProfile?.Boost?.boostedAt).add(
          process.env.BOOST_LASTS_DAYS,
          "days"
        )
      )
    : false
  contentWithProfile.createdBy.isFollowedByCurrentUser =
    await addUserFollowsContentCreator(userId, contentWithProfile.createdBy.id)

  delete contentWithProfile._count
  delete contentWithProfile.likes
  delete contentWithProfile.View
  delete contentWithProfile.Transaction
  delete contentWithProfile.Boost
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
      point?: number
    }
