import DefaultLayout from "../layouts/DefaultLayout"
import Cards from "@/components/Cards"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import { Content } from "types/content"
import { getContents } from "../pages/api/content/service"
import { getSession } from "next-auth/react"
import { useQueries, useQueryClient } from "react-query"
import { getContentById } from "@/api/content"

type HomeProps = {
  contents: Content[]
}

export default function Home({ contents }: HomeProps) {
  console.log(contents)

  // useQueries(
  //   contents.map(content => ({
  //     queryKey: ["content", content.id as string],
  //     queryFn: getContentById,
  //   }))
  // )

  return (
    <>
      <DefaultLayout>
        <div className="flex justify-center mb-40 gap-8 grid-cols-1  flex-wrap">
          {contents.map(content => (
            <Cards key={content.id} content={content} />
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
