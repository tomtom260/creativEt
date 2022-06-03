import HorizontalMenu from "@/components/HorizontalMenu"
import { DefaultLayout } from "@/layouts/layout.stories"
import { getJobsController } from "@/modules/jobs/controller"
import { TJOb } from "@/modules/jobs/types"
import NotificationContainer from "@/modules/notification/components/Container"
import JobsCard from "@/modules/user/component/JobsCard"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import { getSession } from "next-auth/react"
import React, { useState } from "react"
import Skeleton from "react-loading-skeleton"

enum MenuItems {
  "Your Gigs",
  "Client's Gig",
}

type JobsPageProps = {
  jobs: TJOb[]
}

function Jobs({ jobs }: JobsPageProps) {
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(0)
  // const [filteredContents, setFilteredContents] = useState<Contents>([])
  const [flippedCard, setFlippedCard] = useState<string | null>(null)

  return (
    <DefaultLayout>
      <HorizontalMenu
        setSelectedMenuItem={setSelectedMenuItem}
        selectedMenuItem={selectedMenuItem}
        menuItems={Object.values(MenuItems).filter(
          (item) => typeof item === "string"
        )}
      />
      <div className="mb-[800px]  grid   mt-8 md:mt-14 gap-8  mx-auto grid-rows-2  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  flex-wrap">
        {jobs.map((job) => (
          <JobsCard
            key={job.id}
            job={job}
            flippedCard={flippedCard}
            setIsFlipped={setFlippedCard}
          />
        ))}
      </div>
    </DefaultLayout>
  )
}

export async function getServerSideProps({ req }) {
  const user = await getSession({ req })
  const jobs = await getJobsController({
    employeeId: user?.user?.id,
  })
  return {
    props: {
      protected: true,
      jobs: changeDateInJSONToMoment(jobs),
    },
  }
}

export default Jobs
