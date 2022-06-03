import { useGetCurrentUser } from "@/hooks/user"
import { Jobs } from "@prisma/client"
import { useMutation, useQuery } from "react-query"
import { CustomUseMutationOptions } from "../chat/hooks"
import { createJobAPI, getJobAPI } from "./api"
import { TJOb } from "./types"

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

// export function useGetContentsQuery(
//   initialJobs: TJOb[],
//   tag?: string,
//   filter?: string
// ) {
//   const user = useGetCurrentUser().data
//   const getContentsQuery = useQuery(
//     ["jobs", tag, filter],
//     () => getJobAPI(tag),
//     {
//       initialData: initialJobs,
//       refetchOnMount: false,
//     }
//   )

//   useQueries(
//     getContentsQuery.data.map((content) => ({
//       queryFn: () => getContentById(content.id, user.id),
//       queryKey: ["content", content.id],
//       initialData: content,
//     }))
//   )

//   const [firstTime, setFirstTime] = useState(true)

//   useEffect(() => {
//     if (!firstTime) {
//       getContentsQuery.refetch()
//     }
//     return () => {
//       firstTime && setFirstTime(false)
//     }
//   }, [tag, firstTime, filter])

//   return getContentsQuery
// }
