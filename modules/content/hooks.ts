import { getContentById, updateContent } from "@/api/content"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query"
import { Content } from "types/content"

export function useGetContentsQuery(
  initialContents: Content[],
  tag?: string,
  filter?: string,
  creatorName?: string,
  query?: string
) {
  const user = useSession().data?.user
  const getContentsQuery = useQuery(
    ["contents", tag, filter, creatorName],
    () => getContents(tag, filter, creatorName, query),
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
  }, [tag, firstTime, filter, creatorName, query])

  return getContentsQuery
}

async function getContents(
  tag?: string,
  filter?: string,
  creatorName?: string,
  query?: string
) {
  return await (
    await axios.get(`/api/content/getContents`, {
      params: {
        query,
        creatorName,
        tag,
        filter,
      },
    })
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

export function useUpdateContent() {
  const queryClient = useQueryClient()
  return useMutation(updateContent, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(["content", res.id])
    },
  })
}
