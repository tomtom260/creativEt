import { useGetCurrentUser } from "@/hooks/user"
import { JobsStatus } from "@prisma/client"
import { MenuItems } from "pages/account/jobs"
import { useEffect, useState } from "react"
import { useMutation, useQueries, useQuery } from "react-query"
import { CustomUseMutationOptions } from "../chat/hooks"
import { createJobAPI, getJobAPI, getJobByIdAPI } from "./api"
import { FilterOptions, TJOb } from "./types"

export function useCreateJobMutatation(options?: CustomUseMutationOptions) {
  return useMutation(createJobAPI, options)
}

export function useGetYourGigsQuery() {
  const id = useGetCurrentUser().data?.id
  return useQuery(["jobs", "your-gigs"], () =>
    getJobAPI({
      employerId: id,
    })
  )
}
export function useGetClientGigsQuery() {
  const id = useGetCurrentUser().data?.id
  return useQuery(["jobs", "client-gigs"], () =>
    getJobAPI({
      employeeId: id,
    })
  )
}

function getStatus(status: FilterOptions) {
  console.log(status)
  switch (status) {
    case FilterOptions.All:
      return undefined
    case FilterOptions.Pending:
      return JobsStatus.PENDING
    case FilterOptions["In Progress"]:
      return JobsStatus.IN_PROGRESS
    case FilterOptions.Success:
      return JobsStatus.SUCCESS
    case FilterOptions.Cancelled:
      return JobsStatus.CANCELED
  }
}

export function useGetJobsQuery(
  initialJobs: TJOb[],
  status: FilterOptions,
  menu?: MenuItems
) {
  const user = useGetCurrentUser().data
  const getJobsQuery = useQuery(
    ["jobs", menu, status],
    () =>
      getJobAPI({
        employerId: menu === MenuItems["Your Gigs"] ? user?.id : undefined,
        employeeId: menu === MenuItems["Client's Gig"] ? user?.id : undefined,
        status: getStatus(status),
      }),
    {
      initialData: initialJobs,
      refetchOnMount: false,
    }
  )

  useQueries(
    (getJobsQuery.data || []).map((job) => ({
      queryFn: () => getJobByIdAPI(job.id),
      queryKey: ["job", job.id],
      initialData: job,
    }))
  )

  const [firstTime, setFirstTime] = useState(true)

  useEffect(() => {
    if (!firstTime) {
      getJobsQuery.refetch()
    }
    return () => {
      firstTime && setFirstTime(false)
    }
  }, [menu, firstTime, status])

  return getJobsQuery
}
