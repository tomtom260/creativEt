import {
  JobsStatus,
  MoneyTransactionStatus,
  MoneyTransactionType,
  Prisma,
} from "@prisma/client"
import { PublishContent } from "../content/server"
import { createNotifcationController } from "../notification/controller"
import { createMoneyTransaction } from "../walet/server"
import { createJob, getJobs, getJobsById, updateJob } from "./server"

export async function createJobController(data: Prisma.JobsCreateInput) {
  const job = await createJob(data)
  createNotifcationController({
    title: "New Job Offer",
    userId: job.employeeId,
    type: "JOB",
    notifiedById: job.employerId,
  })
  createMoneyTransaction({
    amount: job.price,
    description: `Gig ${job.title}`,
    userId: job.employerId,
    type: MoneyTransactionType.WITHDRAW,
    status: MoneyTransactionStatus.SUCCESS,
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
  const job = await getJobsById(id)

  await createMoneyTransaction({
    amount: job.price,
    description: `Gig ${job.title}`,
    userId: job.employerId,
    type: MoneyTransactionType.DEPOSIT,
    status: MoneyTransactionStatus.SUCCESS,
  }).catch((err) => {
    console.log(err)
  })

  return await updateJob(id, {
    status: JobsStatus.CANCELED,
  })
}

export async function finishJobController(id: string, image: string) {
  return await updateJob(id, {
    status: JobsStatus.SUBMITTED,
    image,
  })
}

export async function successJobController(id: string) {
  const job = await updateJob(id, {
    status: JobsStatus.SUCCESS,
  })
  // PublishContent(job.contentId as string)
  await createMoneyTransaction({
    amount: job.price,
    description: `Gig ${job.title}`,
    userId: job.employeeId,
    type: MoneyTransactionType.DEPOSIT,
    status: MoneyTransactionStatus.SUCCESS,
  }).catch((err) => {
    console.log(err)
  })
  return job
}

export async function reviseContentJobController(id: string) {
  return await updateJob(id, {
    status: JobsStatus.IN_PROGRESS,
  })
}

export async function cancelJobController(id: string, canceledBy: string) {
  const job = await getJobsById(id)

  createMoneyTransaction({
    amount: job.price,
    description:
      canceledBy === job.employerId
        ? `Gig ${job.title}`
        : `Refund ${job.title}`,
    userId:
      canceledBy === job.employeeId || job.status === JobsStatus.PENDING
        ? job.employerId
        : job.employeeId,
    type: MoneyTransactionType.DEPOSIT,
    status: MoneyTransactionStatus.SUCCESS,
  })
  return await updateJob(id, {
    status: JobsStatus.CANCELED,
  })
}
