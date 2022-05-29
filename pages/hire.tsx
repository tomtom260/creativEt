import { useState } from "react"
import ListBox from "@/components/Form/ListBox"
import DefaultLayout from "@/layouts/DefaultLayout"
import HireCard from "../components/Hire/profile"
import Button from "@/components/Button"
import { AdjustmentsIcon } from "@heroicons/react/solid"
import ButtonVariants from "@/components/Button/button.enum"

const filterOptions = ["All", "Following", "Top Rated"]

export default function Hire() {
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    filterOptions[0]
  )
  const [selectedTag, setSelectedTag] = useState()
  return (
    <DefaultLayout padded={false}>
      <div className="w-full flex flex-col box-border bg-cPurple-light">
        <div className="w-full px-4 h-[500px] flex flex-col overflow-hidden  grayscale-0 items-center justify-center">
          <div className="w-full  overflow-hidden h-full absolute">
            <img
              className="-z-10 w-full h-auto relative"
              src="/assets/images/omo.jpg"
            />
          </div>
          <h1 className="text-4xl text-white w-[30rem] text-center ">
            Search for the right content creator you need.{" "}
          </h1>
          <div className="p-4 flex justify-center">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1 items-center">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mb-[800px] flex flex-col px-2  sm:px-6  md:px-4 lg:px-8 pb-2 md:py-8 mx-auto">
          <div className=" flex  sticky top-[60px] py-8 z-20 w-full  flex-1 justify-between  items-center">
            <div className="w-32 ">
              <ListBox
                selected={selectedFilterOption}
                changeSelected={(val) => setSelectedFilterOption(val)}
                options={filterOptions}
              />
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

          <div>
            <div className="mb-[800px]  grid   mt-8 md:mt-14 gap-8  mx-auto grid-rows-2  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  flex-wrap">
              <HireCard></HireCard>
              <HireCard></HireCard>
              <HireCard></HireCard>
              <HireCard></HireCard>
              <HireCard></HireCard>
              <HireCard></HireCard>
              <HireCard></HireCard>
              <HireCard></HireCard>
              <HireCard></HireCard>
              <HireCard></HireCard>
            </div>
          </div>
        </div>
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
