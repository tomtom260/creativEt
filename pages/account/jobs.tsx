import ListBox from "@/components/Form/ListBox"
import HorizontalMenu from "@/components/HorizontalMenu"
import { DefaultLayout } from "@/layouts/layout.stories"
import { getJobsController } from "@/modules/jobs/controller"
import { useGetJobsQuery } from "@/modules/jobs/hooks"
import { FilterOptions, TJOb } from "@/modules/jobs/types"
import JobsCard from "@/modules/user/component/JobsCard"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import { getSession } from "next-auth/react"
import React, { useState } from "react"

export enum MenuItems {
  "Your Gigs",
  "Client's Gig",
}

type JobsPageProps = {
  jobs: TJOb[]
}

const filterOptions = ["All", "Pending", "In Progress", "Success", "Cancelled"]

function Jobs({ jobs }: JobsPageProps) {
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(0)
  const [selectedFilterOption, setSelectedFilterOption] =
    useState<FilterOptions>(filterOptions[0] as FilterOptions)
  const jobsQuery = useGetJobsQuery(
    jobs,
    selectedFilterOption,
    selectedMenuItem
  )
  const [flippedCard, setFlippedCard] = useState<string | null>(null)

  return (
    <DefaultLayout>
      <div className="flex flex-col">
        <HorizontalMenu
          setSelectedMenuItem={setSelectedMenuItem}
          selectedMenuItem={selectedMenuItem}
          menuItems={Object.values(MenuItems).filter(
            (item) => typeof item === "string"
          )}
        />
        <ListBox
          className="mt-6 w-fit self-end"
          selected={selectedFilterOption}
          changeSelected={(val) => setSelectedFilterOption(val)}
          options={filterOptions}
          optionsClassName=" !right-0 !left-auto"
        />
        <div className="mb-[800px]  grid w-full  mt-8 gap-8  mx-auto grid-rows-2  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  flex-wrap">
          {(jobsQuery.data || []).map((job) => (
            <JobsCard
              key={job.id}
              job={job}
              flippedCard={flippedCard}
              setIsFlipped={setFlippedCard}
            />
          ))}
        </div>
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
