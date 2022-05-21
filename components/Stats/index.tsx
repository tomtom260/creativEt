/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid"

const stats = [
  {
    name: "Total Revenue",
    stat: "71,897",
    previousStat: "70,946",
    change: "12%",
    changeType: "increase",
  },
  {
    name: "Total Followers",
    stat: "58.16%",
    previousStat: "56.14%",
  },
  {
    name: "Total Likes",
    stat: "24.57%",
    previousStat: "28.62%",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Stats({ stats }) {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Last 30 days Performance
      </h3>
      <dl className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((item) => {
          item.change =
            Math.abs(item.stat - item.previousStat) / item.previousStat
          item.changeType =
            item.stat - item.previousStat > 0 ? "increase" : "decrease"
          return (
            <div
              key={item.name}
              className="px-4 py-5 rounded-lg overflow-hidden bg-white shadow sm:p-6"
            >
              <dt className="text-base font-normal text-gray-900">
                {item.name}
              </dt>
              <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                  {item.stat}
                  <span className="ml-2 text-sm font-medium text-gray-500">
                    from {item.previousStat}
                  </span>
                </div>

                <div
                  className={classNames(
                    item.changeType === "increase"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800",
                    "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
                  )}
                >
                  {item.changeType === "increase" ? (
                    <ArrowSmUpIcon
                      className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowSmDownIcon
                      className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only">
                    {item.changeType === "increase" ? "Increased" : "Decreased"}{" "}
                    by
                  </span>
                  {item.change}
                </div>
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
