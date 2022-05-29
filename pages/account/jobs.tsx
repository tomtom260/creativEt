import { DefaultLayout } from "@/layouts/layout.stories"
import JobsCard from "@/modules/user/component/JobsCard"
import React from "react"

function Jobs() {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-7">
        <JobsCard />
        <JobsCard />
        <JobsCard />
      </div>
    </DefaultLayout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      protected: true,
    },
  }
}

export default Jobs
