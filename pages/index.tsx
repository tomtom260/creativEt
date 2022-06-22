import DefaultLayout from "../layouts/DefaultLayout"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import { Content } from "types/content"
import { getContents, getTags } from "modules/content/server"
import { getSession } from "next-auth/react"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import { AdjustmentsIcon } from "@heroicons/react/outline"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import ListBox from "@/components/Form/ListBox"
import { ReactElement, useRef, useState } from "react"
import classNames from "@/utils/classNames"
import { useGetContentsQuery } from "@/modules/content/hooks"
import ContentCard from "@/components/Cards/ContentCard"
import Landing from "@/components/Landing"
import Head from "next/head"
import Link from "next/link"

type HomeProps = {
  contents: Content[]
  tags: string[]
}

const filterOptions = ["All", "Popular", "New"]
const filterAdvancedOptions = [
  "Price (Cheapest)",
  "Price (Expensive)",
  "Date Created (Oldest)",
  "Date Created (Latest)",
  "Most Viewed",
]

export default function Home({ contents, tags }: HomeProps) {
  const [selectedAdvancedFilterOption, setSelectedAdvancedFilterOption] =
    useState(filterAdvancedOptions[0])
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    filterOptions[0]
  )

  const [query, setQuery] = useState<string>("")
  const [displayQuery, setDisplayQuery] = useState<string>("")

  const [tag, setTag] = useState<string>()
  const [displayTag, setDisplayTag] = useState<string>()
  const [displayCreatorName, setDisplayCreatorName] = useState<string>()
  const [creatorName, setCreatorName] = useState<string>()
  const [selectedTag, setSelectedTag] = useState(tags[0])
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const getContentsQuery = useGetContentsQuery(
    contents,
    tag ? tag : selectedTag !== "All" ? selectedTag : undefined,
    selectedFilterOption !== "All" ? selectedFilterOption : undefined,
    creatorName,
    query,
    selectedAdvancedFilterOption !== "All"
      ? selectedAdvancedFilterOption
      : undefined
  )

  const timerCreatorNameRef = useRef<NodeJS.Timeout>()
  const timerTagRef = useRef<NodeJS.Timeout>()
  const searchTimerRef = useRef<NodeJS.Timeout>()

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href="./assets/images/landing/background.png"
        />
        <link
          rel="preload"
          as="image"
          href="./assets/images/landing/middleground.png"
        />
        <link
          rel="preload"
          as="image"
          href="./assets/images/landing/foreground.png"
        />
      </Head>
      <Landing
        value={displayQuery}
        onChange={(val) => {
          setDisplayQuery(val)
          searchTimerRef.current && clearTimeout(searchTimerRef.current)
          searchTimerRef.current = setTimeout(() => {
            setQuery(val)
          }, 500)
        }}
      />
      <div
        id="content"
        className="max-w-7xl mb-[800px] flex flex-col px-2  sm:px-6  md:px-4 lg:px-8 pb-2 md:py-8 mx-auto"
      >
        <div className=" flex flex-col px-2  sticky top-[60px] py-8 bg-white  z-20 w-full  flex-1 justify-between  items-center">
          <div className="flex w-full justify-between items-center">
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
              onClick={() => {
                setShowFilter((val) => !val)
              }}
              prependComponent={
                <AdjustmentsIcon className="h-5 w-5 justify-self-end " />
              }
              variant={ButtonVariants.OUTLINED}
            >
              Filters
            </Button>
          </div>
          {showFilter && (
            <div className=" flex w-full  flex-1 justify-between mt-4  items-center">
              <input
                placeholder="Filter by tags"
                className="h-10 md:w-1/3 px-2 border-2 outline-none rounded-md"
                value={displayTag}
                onChange={(e) => {
                  setDisplayTag(e.target.value)
                  timerTagRef.current && clearTimeout(timerTagRef.current)
                  timerTagRef.current = setTimeout(() => {
                    setTag(e.target.value)
                  }, 500)
                }}
              />
              <input
                placeholder="Filter by User"
                className="h-10 md:w-1/3 px-2 border-2 outline-none rounded-md"
                onChange={(e) => {
                  setDisplayCreatorName(e.target.value)
                  timerCreatorNameRef.current &&
                    clearTimeout(timerCreatorNameRef.current)
                  timerCreatorNameRef.current = setTimeout(() => {
                    setCreatorName(e.target.value)
                  }, 500)
                }}
                value={displayCreatorName}
              />
              <ListBox
                optionsClassName="!right-0 !left-auto"
                selected={selectedAdvancedFilterOption}
                changeSelected={(val) => setSelectedAdvancedFilterOption(val)}
                options={filterAdvancedOptions}
              />
            </div>
          )}
        </div>
        <div className="mb-[800px]  grid    gap-8  mx-auto grid-rows-2  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  flex-wrap">
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
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout padded={false}>{page}</DefaultLayout>
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  const contents = await getContents(session?.user.id)

  const tags = await getTags(6)
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
        "px-4 py-[6px]  rounded-lg cursor-pointer"
      )}
    >
      <Text
        className="whitespace-nowrap max-w-40 truncate  overflow-hidden"
        varaint={TypographyVariant.Body1}
      >
        {tag}
      </Text>
    </div>
  )
}
