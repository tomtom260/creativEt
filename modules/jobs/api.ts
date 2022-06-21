import { Prisma } from "@prisma/client"
import axios from "axios"
import { TJOb } from "./types"

export async function createJobAPI(
  data: Prisma.JobsUncheckedCreateWithoutEmployeeInput &
    Prisma.JobsUncheckedCreateWithoutEmployerInput
) {
  return await (
    await axios.post<{ data: Prisma.JobsGetPayload<{}> }>("/api/jobs", data)
  ).data.data
}

export async function getJobAPI(data: Prisma.JobsScalarWhereInput) {
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
    await axios.get<{ data: TJOb }>(`/api/jobs/${id}`)
  ).data.data
}

export async function acceptJobAPI(id: string) {
  return await axios.patch<{ data: TJOb }>(`/api/jobs/${id}?accept`)
}

export async function rejectJobAPI(id: string) {
  return await axios.patch<{ data: TJOb }>(`/api/jobs/${id}?reject`)
}

export async function reviseJobAPI(id: string) {
  return await axios.patch<{ data: TJOb }>(`/api/jobs/${id}?revise`)
}

export async function successJobAPI(id: string) {
  return await axios.patch<{ data: TJOb }>(`/api/jobs/${id}?success`)
}

export async function finishJobAPI({
  id,
  image,
}: {
  id: string
  image: string
}) {
  return await axios.patch<{ data: TJOb }>(`/api/jobs/${id}?finish`, {
    image,
  })
}

export async function addRatingAPI({
  id,
  data,
}: {
  id: string
  data: Prisma.RatingsUncheckedCreateInput
}) {
  return await axios.post<{ data: TJOb }>(`/api/jobs/${id}`, data)
}
