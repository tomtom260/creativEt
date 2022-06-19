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
import {
  getFollowers,
  getFollowersLastMonth,
  getFollowing,
} from "@/modules/follow/server"
import {
  getLikesGroupedDay,
  getMostLikedContent,
  getMostSoldContent,
  getTotalLikes,
  getTotalLikesLastMonth,
} from "@/modules/likes/server"
import {
  getMostViewedContent,
  getViewsGroupedDay,
} from "@/modules/views/server"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import { useRouter } from "next/router"
import {
  getRevenueFromContent,
  getRevenueGroupedDay,
  getTotalRevenue,
  getTotalRevenueLastMonth,
} from "@/modules/walet/server"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function Dashboard({
  profileStats,
  performanceStats,
  groupedLikes,
  groupedViews,
  mostLikedContent,
  mostViewedContent,
  groupedRevenue,
  mostSoldContent,
  revenueDistribution,
}: any) {
  const { data: user } = useGetCurrentUser()
  const isSmallScreen = useMediaQuery({ query: "(max-width: 500px)" })
  const router = useRouter()

  return (
    <DefaultLayout>
      <div className="grid grid-cols-4">
        <div className="col-span-4 md:col-span-3">
          <Stats stats={performanceStats} />
          <div className="mt-12 ">
            <div className="flex md:flex-row items-center flex-col gap-12 overflow-x-auto pb-16">
              <div className="">
                <Text className="mb-4" varaint={TypographyVariant.Body1}>
                  Revenue per day
                </Text>
                <AreaChart
                  stock={groupedRevenue}
                  width={isSmallScreen ? 300 : 500}
                  height={200}
                />
              </div>
              <div>
                <Text
                  className="mb-4 whitespace-nowrap"
                  varaint={TypographyVariant.Body1}
                >
                  Revenue Distribution
                </Text>
                <PieChart
                  distribution={revenueDistribution}
                  width={300}
                  height={200}
                />
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
              {Object.keys(profileStats).map((stat) => (
                <div key={stat} className="flex flex-col items-center">
                  <Text varaint={TypographyVariant.H2}>
                    {profileStats[stat]}
                  </Text>
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
              <Button
                onClick={() => {
                  router.push(`/${user?.username}`)
                }}
                variant={ButtonVariants.PRIMARY}
              >
                View Profile
              </Button>
              <Button
                onClick={() => {
                  router.push("/account/Profile")
                }}
                variant={ButtonVariants.OUTLINED}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
        <div className="pb-16 col-span-4 flex md:flex-row  flex-col gap-4 md:gap-12 overflow-x-auto my-4 md:my-12 items-center md:items-end ">
          <div className="  ">
            <Text className="mb-4" varaint={TypographyVariant.Body1}>
              Likes per day
            </Text>
            <AreaChart
              stock={groupedLikes}
              width={isSmallScreen ? 300 : 500}
              height={200}
            />
          </div>
          <Card
            title="Highest Grossing Content"
            name={mostSoldContent.title}
            image={mostSoldContent.image}
            label="ETB"
            value={mostSoldContent.revenue}
          />
          <Card
            title="Most Liked Content"
            name={mostLikedContent.title}
            image={mostLikedContent.image}
            label="likes"
            value={mostLikedContent._count.likes}
          />
        </div>
        <div className="pb-16 col-span-4 flex md:flex-row flex-col gap-4  md:gap-14 overflow-x-auto items-center md:items-end  ">
          <div className="mt-12  ">
            <Text className="mb-4" varaint={TypographyVariant.Body1}>
              Views per day
            </Text>
            <AreaChart
              stock={groupedViews}
              width={isSmallScreen ? 300 : 500}
              height={200}
            />
          </div>
          <Card
            title="Most Viewed Content"
            name={mostViewedContent.title}
            image={mostViewedContent.image}
            label="views"
            value={mostViewedContent._count.View}
          />
        </div>
      </div>
    </DefaultLayout>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx)
  const id = session?.user.id

  const [
    followers,
    following,
    likes,
    revenue,
    followersLastMonth,
    likesLastMonth,
    revenueLastMonth,
    revenueFromContent,
    groupedRevenue,
    groupedLikes,
    groupedViews,
    mostLikedContent,
    mostViewedContent,
    mostSoldContent,
  ] = await Promise.all([
    (await getFollowers(id)).length,
    (await getFollowing(id)).length,
    (await getTotalLikes(id)).length,
    await getTotalRevenue(id),
    (await getFollowersLastMonth(id)).length,
    (await getTotalLikesLastMonth(id)).length,
    await getTotalRevenueLastMonth(id),
    await getRevenueFromContent(id),
    getRevenueGroupedDay(id),
    getLikesGroupedDay(id),
    getViewsGroupedDay(id),
    getMostLikedContent(id),
    getMostViewedContent(id),
    getMostSoldContent(id),
  ])

  const profileStats = { followers, following, likes }
  const performanceStats = [
    {
      name: "Total Revenue",
      stat: revenue,
      previousStat: revenueLastMonth,
    },
    {
      name: "Total Followers",
      stat: followers,
      previousStat: followersLastMonth,
    },
    {
      name: "Total Likes",
      stat: likes,
      previousStat: likesLastMonth,
    },
  ]

  const revenueDistribution = [
    {
      label: "Gigs",
      usage: 100 - (revenueFromContent / revenue) * 100,
    },
    {
      label: "Content",
      usage: (revenueFromContent / revenue) * 100,
    },
  ]

  return {
    props: changeDateInJSONToMoment({
      protected: true,
      profileStats,
      performanceStats,
      groupedLikes,
      groupedRevenue,
      groupedViews,
      mostLikedContent,
      mostViewedContent,
      mostSoldContent,
      revenueDistribution,
    }),
  }
}

export default Dashboard

type CardProps = {
  title: string
  image: string
  name: string
  label: string
  value: number
}

function Card({ title, image, name, label, value }: CardProps) {
  return (
    <div className=" shadow-xl rounded-lg p-4 pt-8">
      <Text className="" varaint={TypographyVariant.Body1}>
        {title}
      </Text>
      <div className="flex justify-between">
        <Text varaint={TypographyVariant.H1}>{name}</Text>
        <div className="flex gap-2 mb-4 items-end">
          <Text className=" " varaint={TypographyVariant.H1}>
            {value.toString()}
          </Text>
          <Text className="" varaint={TypographyVariant.Body1}>
            {label}
          </Text>
        </div>
      </div>
      <div className="relative w-[275px] h-[200px]">
        <ImageWithSkeleton src={image} layout="fill" />
      </div>
    </div>
  )
}
