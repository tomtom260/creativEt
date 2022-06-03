import { pusherServer } from "@/utils/pusher"
import { JobsStatus, Prisma } from "@prisma/client"
import { createNotifcationController } from "../notification/controller"
import { createJob, getJobs, updateJob } from "./server"
export async function createJobController(data: Prisma.JobsCreateInput) {
  const job = await createJob(data)
  createNotifcationController({
    title: "New Job Offer",
    jobsId: job.id,
    userId: job.employeeId,
    type: "JOB",
  })
  return job
}

export async function getJobsController(data: {
  employeeId?: Prisma.JobsScalarWhereInput["employeeId"]
  employerId?: Prisma.JobsScalarWhereInput["employerId"]
}) {
  return await getJobs(data)
}

export async function acceptJobController(id: string) {
  return await updateJob(id, {
    status: JobsStatus.IN_PROGRESS,
  })
}

export async function rejectJobController(id: string) {
  return await updateJob(id, {
    status: JobsStatus.CANCELED,
  })
}

export async function finishJobController(id: string, image: string) {
  console.log(image)
  return await updateJob(id, {
    status: JobsStatus.SUBMITTED,
    image,
  })
}

export async function successJobController(id: string) {
  return await updateJob(id, {
    status: JobsStatus.SUCCESS,
  })
}

export async function reviseContentJobController(id: string) {
  return await updateJob(id, {
    status: JobsStatus.IN_PROGRESS,
  })
}
