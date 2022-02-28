import { NextApiResponse } from "next"

type RequestMethods = "POST" | "GET" | "PUT" | "PATCH" | "DELETE"

export function wrongRequestMethodError(
  res: NextApiResponse,
  allowedMethods: RequestMethods[]
) {
  res.setHeader("Allow", allowedMethods)
  return res.status(405).json({
    message: `Methods ${allowedMethods.toString()} Only Allowed`,
  })
}
