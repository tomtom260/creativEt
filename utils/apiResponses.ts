import { NextApiResponse } from "next"
import { RestAPIStatus } from "types/status.enum"

type RequestMethods = "POST" | "GET" | "PUT" | "PATCH" | "DELETE"

export function wrongRequestMethodError(
  res: NextApiResponse,
  allowedMethods: RequestMethods[]
) {
  res.setHeader("Allow", allowedMethods)
  return res.status(405).json({
    status: RestAPIStatus.ERROR,
    message: `Methods ${allowedMethods.toString()} Only Allowed`,
  })
}

export function SuccessAPIResponse(
  res: NextApiResponse,
  data: Record<string, unknown>
) {
  return res.status(200).json({
    status: RestAPIStatus.SUCCESS,
    data,
  })
}

export function ErrorAPIResponse(res: NextApiResponse, message: string) {
  return res.status(200).json({
    status: RestAPIStatus.SUCCESS,
    message,
  })
}
