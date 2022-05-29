import { pusherServer } from "@/utils/pusher"
import { Prisma } from "@prisma/client"
import { createJob } from "./server"

export async function createJobController(data: Prisma.JobsCreateInput) {
  const job = await createJob(data)
  pusherServer
    .trigger(`presence-jobs-${job.employeeId}`, "job:new", job)
    .catch((err) => console.log(err))
  return job
}
