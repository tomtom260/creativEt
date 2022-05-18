import React, { useRef } from "react"
import DefaultLayout from "@/layouts/DefaultLayout"
import Stats from "@/components/Stats"
import AreaChart from "@/components/Charts/Area"
import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import { getSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"
import { useGetCurrentUser } from "@/hooks/user"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import { useMediaQuery } from "react-responsive"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import Pie from "@/components/Charts/Pie"
import PieChart from "@/components/Charts/Pie"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const stats = { Followers: 12, Following: 20, Likes: 8 }

function Dashboard() {
  const { data: user } = useGetCurrentUser()
  const isSmallScreen = useMediaQuery({ query: "(max-width: 500px)" })

  return (
    <DefaultLayout>
      <div className="grid grid-cols-4">
        <div className="col-span-4 md:col-span-3">
          <Stats />
          <div className="mt-12 ">
            <div className="flex md:flex-row items-center flex-col gap-12 overflow-x-auto pb-10">
              <div className="">
                <Text className="mb-4" varaint={TypographyVariant.Body1}>
                  Total Revenue
                </Text>
                <AreaChart width={isSmallScreen ? 300 : 500} height={200} />
              </div>
              <div>
                <Text
                  className="mb-4 whitespace-nowrap"
                  varaint={TypographyVariant.Body1}
                >
                  Revenue Distribution
                </Text>
                <PieChart width={300} height={200} />
              </div>
            </div>
          </div>
        </div>
        <div className=" hidden xl:block pl-12 py-8 ">
          <div className="flex-col flex justify-center items-center">
            <div className="relative w-20 md:w-32 h-20 md:h-32 rounded-full overflow-hidden">
              <ImageWithSkeleton layout="fill" src={user?.image!} />
            </div>
            <Text className="mt-6 mb-2" varaint={TypographyVariant.H2}>
              {user?.name}
            </Text>
            <Text className="text-gray-dark " varaint={TypographyVariant.Body2}>
              {user?.bio}
            </Text>
            <div className="flex justify-evenly  w-full mt-8">
              {Object.keys(stats).map((stat) => (
                <div key={stat} className="flex flex-col items-center">
                  <Text varaint={TypographyVariant.H2}>{stats[stat]}</Text>
                  <Text
                    className="text-gray-dark "
                    varaint={TypographyVariant.Body2}
                  >
                    {stat}
                  </Text>
                </div>
              ))}
            </div>
            <div className="flex gap-4 my-12">
              <Button onClick={() => {}} variant={ButtonVariants.PRIMARY}>
                View Profile
              </Button>
              <Button onClick={() => {}} variant={ButtonVariants.OUTLINED}>
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
        <div className="pb-8 col-span-4 flex md:flex-row  flex-col gap-4 md:gap-12 overflow-x-auto my-4 md:my-12 items-center md:items-end ">
          <div className="  ">
            <Text className="mb-4" varaint={TypographyVariant.Body1}>
              Total Likes
            </Text>
            <AreaChart width={isSmallScreen ? 300 : 500} height={200} />
          </div>
          <div className=" shadow-xl rounded-lg p-4 pt-8">
            <Text className="" varaint={TypographyVariant.Body1}>
              Highest Grossing Post
            </Text>
            <Text className="mt-2 mb-4" varaint={TypographyVariant.H1}>
              700$
            </Text>
            <div className="relative w-[275px] h-[200px] bg-red-700">
              {/* <ImageWithSkeleton
              src={
                "https://res.cloudinary.com/dlqzrhr6r/image/upload/v1651138184/image-content/inibz1jn5egwscfi9rcp.jpg"
              }
              layout="fill"
            /> */}
            </div>
          </div>
          <div className=" shadow-xl rounded-lg p-4 pt-8">
            <Text className="" varaint={TypographyVariant.Body1}>
              Highest Grossing Post
            </Text>
            <Text className="mt-2 mb-4" varaint={TypographyVariant.H1}>
              700$
            </Text>
            <div className="relative w-[275px] h-[200px] bg-red-700">
              {/* <ImageWithSkeleton
              src={
                "https://res.cloudinary.com/dlqzrhr6r/image/upload/v1651138184/image-content/inibz1jn5egwscfi9rcp.jpg"
              }
              layout="fill"
            /> */}
            </div>
          </div>
        </div>
        <div className="pb-8 col-span-4 flex md:flex-row flex-col gap-4  md:gap-14 overflow-x-auto items-center md:items-end  ">
          <div className="mt-12  ">
            <Text className="mb-4" varaint={TypographyVariant.Body1}>
              Total Likes
            </Text>
            <AreaChart width={isSmallScreen ? 300 : 500} height={200} />
          </div>
          <div className=" shadow-xl rounded-lg p-4 pt-8">
            <Text className="" varaint={TypographyVariant.Body1}>
              Highest Grossing Post
            </Text>
            <Text className="mt-2 mb-4" varaint={TypographyVariant.H1}>
              700$
            </Text>
            <div className="relative w-[275px] h-[200px] bg-red-700">
              {/* <ImageWithSkeleton
              src={
                "https://res.cloudinary.com/dlqzrhr6r/image/upload/v1651138184/image-content/inibz1jn5egwscfi9rcp.jpg"
              }
              layout="fill"
            /> */}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx)
  const id = session?.user.id

  return {
    props: {
      protected: true,
    },
  }
}

export default Dashboard
