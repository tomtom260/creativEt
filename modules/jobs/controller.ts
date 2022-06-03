import { pusherServer } from "@/utils/pusher"
import { Prisma } from "@prisma/client"
import { createNotifcationController } from "../notification/controller"
import { createJob, getJobs } from "./server"
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
