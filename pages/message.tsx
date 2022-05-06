import DefaultLayout from "@/layouts/DefaultLayout"
import Card from "modules/chat/components/Card"
import SearchInput from "modules/chat/components/input"
import React, { useState, InputHTMLAttributes } from "react"

function Message() {
  const [search, setSearch] = useState("")
  return (
    <DefaultLayout>
      <div className="grid grid-cols-4">
        <div className="flex flex-col mr-6">
          <SearchInput
            label=""
            value={search}
            onChange={(val) => setSearch(val)}
          />
          <div>
            <Card />
          </div>
        </div>
        <div className="bg-emerald-700 col-span-3">a</div>
      </div>
    </DefaultLayout>
  )
}

export default Message
