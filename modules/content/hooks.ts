import { getContentById } from "@/api/content"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useQueries, useQuery } from "react-query"
import { Content } from "types/content"

export function useGetContentsQuery(initialContents: Content[], tag?: string) {
  const user = useSession().data?.user
  const getContentsQuery = useQuery(["contents", tag], () => getContents(tag), {
    initialData: initialContents,
    refetchOnMount: false,
  })
  const [firstTime, setFirstTime] = useState(true)

  useEffect(() => {
    if (!firstTime) {
      getContentsQuery.refetch()
    }
    return () => {
      firstTime && setFirstTime(false)
    }
  }, [tag, firstTime])

  //   useQueries(
  //     getContentsQuery.data.map((content) => ({
  //       queryFn: () => getContentById(content.id, user.id),
  //       queryKey: ["content", content.id],
  //       initialData: content,
  //     }))
  //   )

  return getContentsQuery
}

async function getContents(tag?: string) {
  return await (
    await axios.get(`/api/content/getContents?${tag && `tag=${tag}`}`)
  ).data.data
}
