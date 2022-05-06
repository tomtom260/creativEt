import { getSession } from "next-auth/react"
import { prisma } from "@/utils/db"

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

export async function getProfile(){
  
}