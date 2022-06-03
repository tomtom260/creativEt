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

export async function getJobAPI(data: Prisma.JobsScalarWhereInput) {
  return await (
    await axios.get("/api/jobs", {
      params: data,
    })
  ).data.data
}

export async function getJobByIdAPI(id: string) {
  return await (
    await axios.get(`/api/jobs/${id}`)
  ).data.data
}
