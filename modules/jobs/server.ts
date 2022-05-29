import { prisma } from "@/utils/db"
import { Prisma } from "@prisma/client"

export async function createJob(data: Prisma.JobsCreateInput) {
  return await prisma.jobs.create({
    data,
  })
}
export async function getJobsWhereEmployee(id: string) {
  return await prisma.jobs.findMany({
    where: {
      employeeId: id,
    },
  })
}
export async function getJobsWhereEmployer(id: string) {
  return await prisma.jobs.findMany({
    where: {
      employerId: id,
    },
  })
}
