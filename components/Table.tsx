import classNames from "@/utils/classNames"
import { MoneyTransactionStatus, MoneyTransactionType } from "@prisma/client"
import moment from "moment"

/* This example requires Tailwind CSS v2.0+ */
const items = [
  {
    description: "Lindsay Walton",
    amount: 180,
    role: "Tuseday",
  },
  {
    description: "Lindsay Walton",
    amount: 482,
    role: "Tuseday",
  },
  // More people...
]

type TableProps = {
  items: {
    id: string
    description: string
    amount: number
    transactionAt: Date
    status: MoneyTransactionStatus
    type: MoneyTransactionType
  }[]
  className: string
}

export default function Table({ items, className }: TableProps) {
  return (
    <div className={classNames("mt-8 flex w-full flex-col", className)}>
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Amount (ETB)
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap  py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="">
                          <div className="font-medium text-gray-900">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="text-gray-900">
                        {item.type === MoneyTransactionType.DEPOSIT
                          ? "+"
                          : " -"}{" "}
                        {item.amount}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span
                        className={classNames(
                          "inline-flex rounded-full  px-2 text-xs font-semibold leading-5",
                          item.status === MoneyTransactionStatus.SUCCESS
                            ? "bg-green-100 text-green-800"
                            : item.status === MoneyTransactionStatus.CANCELED
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        )}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {moment(item.transactionAt).format("YYYY-MM-DD")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
