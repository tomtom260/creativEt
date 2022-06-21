import { getSession } from "next-auth/react"
import { prisma } from "@/utils/db"
import { ErrorAPIResponse } from "@/utils/apiResponses"
import {
  JobsStatus,
  MoneyTransactionStatus,
  MoneyTransactionType,
} from "@prisma/client"

export async function isFollwingUser(currentUser = "", followedUser: string) {
  const result = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUser,
        followingId: followedUser,
      },
    },
  })
  return !!result
}

export async function getUserWithProfile(
  id: string,
  currentUserId: string,
  includeTransactions = false
) {
  let user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      Profile: true,
      // followers: true,
      MoneyTransaction: !!includeTransactions,
      following: true,
    },
  })

  user = {
    ...user,
    location: user?.Profile?.location,
    username: user?.Profile?.username,
    bio: user?.Profile?.bio,
  }

  if (!user) {
    return ErrorAPIResponse(res, `User with that id ${id} not found`)
  }

  if (user.MoneyTransaction) {
    user.balance = user.MoneyTransaction.filter(
      (tran) => tran.status === MoneyTransactionStatus.SUCCESS
    ).reduce((acc, red) => {
      if (red.type === MoneyTransactionType.DEPOSIT) {
        return (acc += red.amount)
      } else {
        return (acc -= red.amount)
      }
    }, 0)
    delete user.MoneyTransaction
  }
  user.isFollowedByCurrentUser = user.following.some(
    (follow) => follow.followerId === currentUserId
  )

  // delete user.followers
  delete user.following
  delete user.Profile

  return user
}

export async function searchUsers(username: string) {
  const profiles = await prisma.profile.findMany({
    include: {
      user: true,
    },
    where: {
      username: {
        startsWith: username,
      },
      user: {
        deleted: false,
      },
    },
  })
  return profiles.map((profile) => ({
    ...profile.user,
    username: profile.username,
    bio: profile.bio,
    location: profile.location,
  }))
}

export async function searchUser(username: string) {
  const profiles = await prisma.profile.findMany({
    include: {
      user: true,
    },
    where: {
      username,
      user: {
        deleted: false,
      },
    },
  })
  return profiles.map((profile) => ({
    ...profile.user,
    username: profile.username,
    bio: profile.bio,
    location: profile.location,
  }))
}

export async function getUsersForHIre(
  id: string,
  filters = FILTERS["Top Rated"],
  query?: string
) {
  const users = await prisma.user.findMany({
    include: {
      Profile: true,
      followers: true,
      Ratings: true,
      employee: true,
    },
    where: {
      deleted: false,
      OR: query
        ? [
            {
              Profile: query
                ? {
                    location: {
                      contains: query,
                    },
                  }
                : undefined,
            },
            {
              name: query
                ? {
                    contains: query,
                  }
                : undefined,
            },
          ]
        : undefined,
      availableForHire: true,
      id: {
        not: id,
      },
      followers:
        FILTERS.FOLLOWING === filters
          ? {
              some: {
                followerId: id,
              },
            }
          : undefined,
    },
  })
  return users
    .map((user) => {
      const newUser = {
        ...user,
        location: user.Profile?.location,
        bio: user.Profile?.bio,
        username: user.Profile?.username,
      }
      delete newUser.Profile
      return newUser
    })
    .map((user) => {
      user.numberOfJobs = user.employee.filter(
        (job) => job.status === JobsStatus.SUCCESS
      ).length
      delete user.employee

      user.rating = user.Ratings.length
        ? (
            user.Ratings.reduce((acc, red) => {
              return acc + red.value
            }, 0) / user.Ratings.length
          ).toFixed(1)
        : 0
      delete user.Ratings
      return user
    })
}

export async function updateUsername(id: string, username: string) {
  return await prisma.profile.update({
    data: {
      username,
    },
    where: {
      userId: id,
    },
  })
}

export async function updateEmail(id: string, email: string) {
  return await prisma.user.update({
    data: {
      email,
    },
    where: {
      id,
    },
  })
}

export async function deleteAccount(id: string) {
  return await prisma.user.update({
    data: {
      deleted: true,
    },
    where: {
      id,
    },
  })
}

export async function updatePassword(id: string, password: string) {
  return await prisma.account
    .update({
      data: {
        password,
      },
      where: {
        provider_providerAccountId: {
          provider: "user&Password",
          providerAccountId: id,
        },
      },
    })
    .then((res) => {
      console.log(res)
    })
}

export async function getAccount(id: string) {
  return await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: "user&Password",
        providerAccountId: id,
      },
    },
  })
}

export async function getVerificationToken(id: string) {
  return await prisma.verificationToken.findUnique({
    where: {
      id,
    },
  })
}

enum FILTERS {
  "Top Rated" = "Top Rated",
  FOLLOWING = "Following",
}
