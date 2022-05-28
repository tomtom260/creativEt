import DefaultLayout from "../layouts/DefaultLayout"
import Cards from "@/components/Cards/BaseCard"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import { Content } from "types/content"
import { getContents, getTags } from "modules/content/server"
import { getSession } from "next-auth/react"
import { useQuery } from "react-query"
import { transformUserResponse } from "api/user"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import { AdjustmentsIcon } from "@heroicons/react/outline"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import ListBox from "@/components/Form/ListBox"
import { useState } from "react"
import classNames from "@/utils/classNames"
import { useGetContentsQuery } from "@/modules/content/hooks"
import ContentCard from "@/components/Cards/ContentCard"
import Landing from "@/components/Landing"
import NavBar from "@/components/navbar/userNav"

type HomeProps = {
  contents: Content[]
  tags: string[]
}

const filterOptions = ["All", "Following", "Popular", "New"]

export default function Home({ contents, tags }: HomeProps) {
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    filterOptions[0]
  )
  const [selectedTag, setSelectedTag] = useState(tags[0])
  const getContentsQuery = useGetContentsQuery(
    contents,
    selectedTag !== "All" ? selectedTag : undefined,
    selectedFilterOption !== "All" ? selectedFilterOption : undefined
  )
  return (
    <>
      <DefaultLayout padded={false}>
        <Landing />
        <div
          id="content"
          className="max-w-7xl mb-[800px] flex flex-col px-2  sm:px-6  md:px-4 lg:px-8 pb-2 md:py-8 mx-auto"
        >
          <div className=" flex  sticky top-[60px] py-8 bg-white z-20 w-full  flex-1 justify-between  items-center">
            <div className="w-32 ">
              <ListBox
                selected={selectedFilterOption}
                changeSelected={(val) => setSelectedFilterOption(val)}
                options={filterOptions}
              />
            </div>
            <div className="  flex self-center  justify-self-center  gap-6">
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
          <p className="">aaa</p>
          <div className="mb-[800px]  grid   mt-8 md:mt-14 gap-8  mx-auto grid-rows-2  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  flex-wrap">
            {getContentsQuery.data?.map((content) => (
              <>
                <ContentCard
                  key={content.id}
                  loading={getContentsQuery.isFetching}
                  content={content}
                />
              </>
            ))}
          </div>
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
      tags: ["All"].concat(tags),
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
