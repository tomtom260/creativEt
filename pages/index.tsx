import DefaultLayout from "../layouts/DefaultLayout"
import Cards from "@/components/Cards"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import { Content } from "types/content"
import { getContents } from "modules/content/server"
import { getSession } from "next-auth/react"
import { useQueries, useQuery, useQueryClient } from "react-query"
import { getContentById } from "@/api/content"
import { fetchUserWithProfile, transformUserResponse } from "api/user"

type HomeProps = {
  contents: Content[]
}

export default function Home({ contents }: HomeProps) {
  const { data: user } = useQuery(["currentUser"], {
    select: transformUserResponse,
  })

  const contentsQuery = useQueries(
    contents.map((content) => ({
      queryFn: () => getContentById(content.id, user.id),
      queryKey: ["content", content.id],
      initialData: content,
    }))
  )

  return (
    <>
      <DefaultLayout>
        <div className="flex mb-40 gap-8  grid-cols-1  flex-wrap">
          {contentsQuery.map((content) => (
            <Cards
              key={content.data.id}
              content={content.data}
            />
          ))}
        </div>
      </DefaultLayout>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  const contents = await getContents(session?.user.id)
  return {
    props: {
      protected: true,
      contents: changeDateInJSONToMoment(contents),
    },
  }
}
