import { prisma } from "@/utils/db"
import { JobsStatus, Prisma } from "@prisma/client"
import moment from "moment"

export async function createJob(data: Prisma.JobsCreateInput) {
  return await prisma.jobs.create({
    data,
  })
}
export async function getJobs(data: Prisma.JobsScalarWhereInput) {
  return (
    await prisma.jobs.findMany({
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
  ).sort((a, b) => (moment(a.updatedAt).isBefore(moment(b.updatedAt)) ? 1 : -1))
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

export async function updateJob(
  id: string,
  data: Prisma.JobsUncheckedUpdateInput
) {
  return await prisma.jobs.update({
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
      content: true,
    },
    where: {
      id,
    },
    data,
  })
}

export async function addRating(data: Prisma.RatingsUncheckedCreateInput) {
  return await prisma.ratings.create({
    data,
  })
}
