import { Prisma } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { Content } from "types/content"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"
import { prisma } from "../../../utils/db"

type NextApiRequestType = Omit<NextApiRequest, "body"> & {
  body: Prisma.ContentUncheckedCreateInput
}

export default async function userHandler(
  req: NextApiRequestType,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const id = session?.user?.id!

  const { image, title, description, tags, userId, price } = req.body
  if (!image || !title) {
    return
  }

  switch (req.method) {
    case "POST":
      const content = await prisma.content
        .create({
          data: {
            image,
            title,
            description,
            price: parseInt(price),
            userId: userId || id,
            tags: {
              connectOrCreate: tags.map((tag) => ({
                create: { name: tag },
                where: { name: tag },
              })),
            },
          },
        })
        .catch((err) => console.log(err))
      return SuccessAPIResponse(res, content!)
    default:
      wrongRequestMethodError(res, ["POST"])
  }
}
