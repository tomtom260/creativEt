import Button from "@/components/Button"
import ButtonVariants from "@/components/Button/button.enum"
import DefaultLayout from "@/layouts/DefaultLayout"
import { PaperAirplaneIcon } from "@heroicons/react/solid"
import Card from "modules/chat/components/Card"
import MessageInput from "modules/chat/components/MessageInput"
import SearchInput from "modules/chat/components/SearchInput"
import React, { useState } from "react"

function Message() {
  const [search, setSearch] = useState("")
  return (
    <DefaultLayout>
      <div className="grid grid-cols-4 gap-y-4 bg-gray-light p-4">
        <div className="col-span-4 px-2 ">
          <SearchInput
            label=""
            value={search}
            onChange={(val) => setSearch(val)}
          />
        </div>
        <div className="flex flex-col mr-6 px-2 ">
          <div className=" divide-y-2  rounded-xl overflow-hidden ">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div className="bg-white rounded-xl col-span-3 w-full flex">
          <div className="flex flex-1 gap-4 mx-4 items-end">
            <MessageInput
              label=""
              value={search}
              onChange={(val) => setSearch(val)}
            />
            <Button
              className="text-white mb-1 !pb-4 bg-secondary-normal p-2 md:!w-12 md:!h-12 rotate-45"
              onClick={() => {}}
              variant={ButtonVariants.ICON}
            >
              <PaperAirplaneIcon />
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Message
