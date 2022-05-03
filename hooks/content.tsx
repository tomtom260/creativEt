// import { getContentById, getBoughtContents } from "@/api/content"
// import { useEffect, useState } from "react"
// import { UseQueryOptions, useQueries } from "react-query"

// export function useContentBoughtQuery({
//   userId,
//   options,
//   onSuccess,
// }: {
//   userId: string
//   options: UseQueryOptions
// }) {
//   const [contents, setContents] = useState([])
//   useEffect(() => {
//     getBoughtContents().then((res) => setContents(res))
//   }, [])

//   useQueries(
//     contents.map((content) => ({
//       queryFn: () => getContentById(content.id, userId),
//       queryKey: ["content", content.id],
//       initialData: content,
//       ...options,
//     }))
//   )
//   return contents
// }
