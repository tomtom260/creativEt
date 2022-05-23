import { getContentById } from "@/api/content"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useQueries, useQuery } from "react-query"
import { Content } from "types/content"

export function useGetContentsQuery(
  initialContents: Content[],
  tag?: string,
  filter?: string
) {
  const user = useSession().data?.user
  const getContentsQuery = useQuery(
    ["contents", tag, filter],
    () => getContents(tag, filter),
    {
      initialData: initialContents,
      refetchOnMount: false,
    }
  )
  useQueries(
    getContentsQuery.data.map((content) => ({
      queryFn: () => getContentById(content.id, user.id),
      queryKey: ["content", content.id],
      initialData: content,
    }))
  )

  const [firstTime, setFirstTime] = useState(true)

  useEffect(() => {
    if (!firstTime) {
      getContentsQuery.refetch()
    }
    return () => {
      firstTime && setFirstTime(false)
    }
  }, [tag, firstTime, filter])

  return getContentsQuery
}

async function getContents(tag?: string, filter?: string) {
  console.log("filter", filter)
  return await (
    await axios.get(
      `/api/content/getContents?${tag ? `tag=${tag}` : ""}${
        tag && filter ? "&" : ""
      }${filter ? `filter=${filter}` : ""}`
    )
  ).data.data
}
