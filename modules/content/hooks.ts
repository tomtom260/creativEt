import { getContentById } from "@/api/content"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query"
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
  return await (
    await axios.get(
      `/api/content/getContents?${tag ? `tag=${tag}` : ""}${
        tag && filter ? "&" : ""
      }${filter ? `filter=${filter}` : ""}`
    )
  ).data.data
}

async function deleteContent(id: string) {
  console.log("delete", id)
  return await (
    await axios.delete(`/api/content/deleteContent?id=${id}`)
  ).data.data
}

async function boostContent(id: string) {
  return await (
    await axios.get(`/api/content/boostContent?id=${id}`)
  ).data.data
}

export function useDeleteContentMutation(id: string) {
  const queryClient = useQueryClient()
  return useMutation(() => deleteContent(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["myContents"])
    },
  })
}

export function useBoostContentMutation(id: string) {
  const queryClient = useQueryClient()
  return useMutation(() => boostContent(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["myContents", "boost"])
    },
  })
}
