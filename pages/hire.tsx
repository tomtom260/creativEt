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
import UserCard from "@/modules/user/component/card"
import { User } from "types/user"
import { getUsersForHIre } from "@/modules/user/server"
import { useGetUsersForHireQuery } from "@/hooks/user"
import HireModal from "@/modules/user/component/HireModal"
import Head from "next/head"

type HomeProps = {
  users: User[]
}

const filterOptions = ["Top Rated", "Following"]
export default function Home({ users }: HomeProps) {
  console.log(users)
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    filterOptions[0]
  )
  const [query, setQuery] = useState<string>("")
  const [displayQuery, setDisplayQuery] = useState<string>("")
  const searchTimerRef = useRef<NodeJS.Timeout>()

  // const getUsersQuery = useGetContentsQuery(
  //   contents,
  //   tag ? tag : selectedTag !== "All" ? selectedTag : undefined,
  //   selectedFilterOption !== "All" ? selectedFilterOption : undefined,
  //   creatorName,
  //   query,
  //   selectedAdvancedFilterOption !== "All"
  //     ? selectedAdvancedFilterOption
  //     : undefined
  // )
  const usersQuery = useGetUsersForHireQuery(users, query, selectedFilterOption)

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
        className="max-w-7xl w-full mb-[800px] flex flex-col px-0  sm:px-6  md:px-4 lg:px-8 pb-2 md:py-8 mx-auto"
      >
        <div className=" flex  sticky top-[60px] py-8 px-2  bg-white z-20 w-full  flex-1 justify-between  items-center">
          <div className="w-32 ">
            {/* <ListBox
              selected={selectedFilterOption}
              changeSelected={(val) => setSelectedFilterOption(val)}
              options={filterOptions}
            /> */}
          </div>
          <div className="  flex self-center  justify-self-center  gap-6"></div>
          {/* <Button
            onClick={() => {}}
            prependComponent={
              <AdjustmentsIcon className="h-5 w-5 justify-self-end " />
            }
            variant={ButtonVariants.OUTLINED}
          >
            Filters
          </Button> */}
        </div>
        <div className="mb-[800px]  px-4 md:px-12 grid  mt-8 md:mt-14 gap-8  mx-auto grid-rows-2 grid-cols-1 w-full  flex-wrap">
          {usersQuery
            .map((userQuery) => userQuery.data)
            .map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
        </div>
      </div>
      <HireModal />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout padded={false}>{page}</DefaultLayout>
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  const users = await getUsersForHIre(session?.user.id, filterOptions[0])
  return {
    props: {
      users: changeDateInJSONToMoment(users),
      protected: true,
    },
  }
}
