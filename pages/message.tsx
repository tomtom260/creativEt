import DefaultLayout from "@/layouts/DefaultLayout"
import Card from "@/modules/chat/components/Card"
import SearchInput from "modules/chat/components/SearchInput"
import React, { useState } from "react"
import { NextPageContext } from "next"
import { searchUsers } from "modules/user/server"
import { useSearchUsers } from "@/hooks/user"
import ChatBox from "@/modules/chat/components/ChatBox"

function Chat() {
  const [search, setSearch] = useState("")
  const searchUserQuery = useSearchUsers(search, {})

  return (
    <DefaultLayout>
      <div className="flex flex-1">
        <div className="hidden md:flex flex-col md:gap-y-4">
          <div className="flex gap-x-10 py-2 bg-gray-light px-2">
            <div className="hidden md:flex">
              <SearchInput
                label=""
                value={search}
                onChange={(val) => setSearch(val)}
              />
            </div>
          </div>
          <div className="flex gap-x-6">
            <div className="hidden flex-shrink-0 min-w-[280px] md:flex flex-col  px-2 ">
              <div className=" divide-y-2  rounded-xl overflow-hidden ">
                {searchUserQuery.data &&
                  searchUserQuery.data.map((user) => {
                    return (
                      <Card
                        key={user.id}
                        username={user.username}
                        name={user.name}
                        searchString={search}
                        image={user.image}
                      />
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
        <ChatBox />
      </div>
    </DefaultLayout>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  const users = await searchUsers("t")
  console.log(users)
  return {
    props: {
      protected: true,
    },
  }
}

export default Chat
