import { Prisma } from "@prisma/client"
import axios from "axios"

export async function createJobAPI(
  data: Prisma.JobsUncheckedCreateWithoutEmployeeInput &
    Prisma.JobsUncheckedCreateWithoutEmployerInput
) {
  return await (
    await axios.post("/api/jobs", data)
  ).data.data
}
