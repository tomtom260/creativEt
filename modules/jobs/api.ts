import { Prisma } from "@prisma/client"
import axios from "axios"
import { TJOb } from "./types"

export async function createJobAPI(
  data: Prisma.JobsUncheckedCreateWithoutEmployeeInput &
    Prisma.JobsUncheckedCreateWithoutEmployerInput
) {
  return await (
    await axios.post("/api/jobs", data)
  ).data.data
}

export async function getJobAPI(data: Prisma.JobsScalarWhereInput) {
  console.log(data)
  return (
    await axios.get<{
      data: TJOb[]
    }>("/api/jobs", {
      params: data,
    })
  ).data.data
}

export async function getJobByIdAPI(id: string) {
  return await (
    await axios.get(`/api/jobs/${id}`)
  ).data.data
}
