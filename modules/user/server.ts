import { getSession } from "next-auth/react"
import { prisma } from "@/utils/db"
import { ErrorAPIResponse } from "@/utils/apiResponses"
import { MoneyTransactionStatus, MoneyTransactionType } from "@prisma/client"

export async function isFollwingUser(
  currentUser: string,
  followedUser: string
) {
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
    },
  })
  return profiles.map((profile) => ({
    ...profile.user,
    username: profile.username,
    bio: profile.bio,
    location: profile.location,
  }))
}
