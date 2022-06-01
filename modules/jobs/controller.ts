import { pusherServer } from "@/utils/pusher"
import { Prisma } from "@prisma/client"
import { createNotifcationController } from "../notification/controller"
import { createJob } from "./server"
export async function createJobController(data: Prisma.JobsCreateInput) {
  const job = await createJob(data)
  createNotifcationController({
    title: "New Job Offer",
    jobsId: job.id,
    userId: job.employeeId,
    type: "JOB",
  })
  // pusherServer
  //   .trigger(`notifications-${job.employeeId}`, "notification:new", job)
  //   .catch((err) => console.log(err))
  return job
}
