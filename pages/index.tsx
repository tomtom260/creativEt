import DefaultLayout from "../layouts/DefaultLayout"
import Cards from "@/components/Cards"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import { Content } from "types/content"
import { getContents, getTags } from "modules/content/server"
import { getSession } from "next-auth/react"
import { useQueries, useQuery } from "react-query"
import { getContentById } from "@/api/content"
import { transformUserResponse } from "api/user"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import { AdjustmentsIcon, ChevronDownIcon } from "@heroicons/react/outline"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import ListBox from "@/components/Form/ListBox"
import { useState } from "react"
import classNames from "@/utils/classNames"

type HomeProps = {
  contents: Content[]
  tags: string[]
}

  const filterOptions = ["All", "Following", "Popular", "New"]

export default function Home({ contents, tags }: HomeProps) {
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

  const [selectedFilterOption, setSelectedFilterOption] = useState(
    filterOptions[0]
  )
  const [selectedTag, setSelectedTag] = useState(tags[0])

  return (
    <>
      <DefaultLayout>
        <div className=" flex flex-1 justify-between  items-center">
          <div className="w-32 ">
            <ListBox
              selected={selectedFilterOption}
              changeSelected={(val) => setSelectedFilterOption(val)}
              options={filterOptions}
            />
          </div>
          <div className="flex self-center  justify-self-center  gap-6">
            {tags.map((tag) => (
              <Tag
                key={tag}
                tag={tag}
                selectedTag={selectedTag}
                changeSelectedTag={() => setSelectedTag(tag)}
              />
            ))}
          </div>
          <Button
            onClick={() => {}}
            prependComponent={
              <AdjustmentsIcon className="h-5 w-5 justify-self-end " />
            }
            variant={ButtonVariants.OUTLINED}
          >
            Filters
          </Button>
        </div>
        <div className="grid mb-40 gap-8  mx-auto  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  flex-wrap">
          {/* {contentsQuery.map((content) => (
            <Cards key={content.data.id} content={content.data} />
          ))} */}
        </div>
      </DefaultLayout>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  const contents = await getContents(session?.user.id)
  const tags = await getTags(8)
  return {
    props: {
      protected: true,
      contents: changeDateInJSONToMoment(contents),
      tags,
    },
  }
}

type TagProps = {
  selectedTag: string
  changeSelectedTag: () => void
  tag: string
}

function Tag({ selectedTag, changeSelectedTag, tag }: TagProps) {
  return (
    <div
      key={tag}
      onClick={changeSelectedTag}
      className={classNames(
        tag === selectedTag ? "bg-gray-200 text-black " : "",
        "px-4 py-[6px] rounded-lg cursor-pointer"
      )}
    >
      <Text varaint={TypographyVariant.Body1}>{tag}</Text>
    </div>
  )
}
