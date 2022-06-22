import { getAllRooms } from "@/modules/chat/server/controller"
import { searchUsers } from "modules/user/server"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
  SuccessAPIResponse,
  wrongRequestMethodError,
} from "../../../utils/apiResponses"

type NextApiRequestType = Omit<NextApiRequest, "query"> & {
  query: {
    username: string
  }
}

export default async function userHandler(
  req: NextApiRequestType,
  res: NextApiResponse
) {
  const { username } = req.query
  const session = await getSession({ req })
  switch (req.method) {
    case "GET":
      const rooms = await (
        await getAllRooms(session?.user.id)
      ).filter((room) => room.Message.length)
      const users = (await searchUsers(username)).filter((user) => {
        return user.id !== session?.user.id
      })
      console.log(users)
      return SuccessAPIResponse(res, users)

    default:
      wrongRequestMethodError(res, ["GET"])
  }
}
