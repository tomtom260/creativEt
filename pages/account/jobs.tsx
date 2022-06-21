import ListBox from "@/components/Form/ListBox"
import HorizontalMenu from "@/components/HorizontalMenu"
import { DefaultLayout } from "@/layouts/layout.stories"
import { getJobsController } from "@/modules/jobs/controller"
import { useGetJobsQuery } from "@/modules/jobs/hooks"
import { FilterOptions, TJOb } from "@/modules/jobs/types"
import FinishJobModal from "@/modules/jobs/components/FinishJobModal"
import JobsCard from "@/modules/jobs/components/JobsCard"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import moment from "moment"
import { getSession } from "next-auth/react"
import React, { useState } from "react"
import PreviewModal from "@/modules/jobs/components/PreviewModal"
import RatingModal from "@/modules/jobs/components/RatingModal"

export enum MenuItems {
  "Your Gigs",
  "Client's Gig",
}

type JobsPageProps = {
  jobs: TJOb[]
}

const filterOptions = [
  "All",
  "Pending",
  "In Progress",
  "Submitted",
  "Success",
  "Cancelled",
]

function Jobs({ jobs }: JobsPageProps) {
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(0)
  const [selectedFilterOption, setSelectedFilterOption] =
    useState<FilterOptions>(filterOptions[0] as FilterOptions)
  const { jobsQuery, jobsQueriesData } = useGetJobsQuery(
    jobs,
    selectedFilterOption,
    selectedMenuItem
  )
  const [flippedCard, setFlippedCard] = useState<string | null>(null)

  return (
    <>
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
            {jobsQueriesData
              // .sort((a, b) =>
              //   moment(a.data?.updatedAt).isBefore(moment(b.data?.updatedAt))
              //     ? 1
              //     : -1
              // )
              .map((job) => (
                <JobsCard
                  key={job?.data?.id}
                  job={job.data as TJOb}
                  flippedCard={flippedCard}
                  setIsFlipped={setFlippedCard}
                  isLoading={job.isFetching || jobsQuery.isFetching}
                />
              ))}
          </div>
        </div>
      </DefaultLayout>
      <FinishJobModal />
      <PreviewModal />
      <RatingModal />
    </>
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
