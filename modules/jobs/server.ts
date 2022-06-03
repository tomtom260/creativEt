import { prisma } from "@/utils/db"
import { JobsStatus, Prisma } from "@prisma/client"

export async function createJob(data: Prisma.JobsCreateInput) {
  return await prisma.jobs.create({
    data,
  })
}
export async function getJobs(data: Prisma.JobsScalarWhereInput) {
  return await prisma.jobs.findMany({
    include: {
      employer: {
        select: {
          image: true,
          name: true,
        },
      },
      employee: {
        select: {
          image: true,
          name: true,
        },
      },
    },
    where: {
      ...data,
    },
  })
}
export async function getJobsById(id: string) {
  return await prisma.jobs.findUnique({
    include: {
      employer: {
        select: {
          image: true,
          name: true,
        },
      },
      employee: {
        select: {
          image: true,
          name: true,
        },
      },
    },
    where: {
      id,
    },
  })
}
