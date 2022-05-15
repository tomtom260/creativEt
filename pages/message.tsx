import DefaultLayout from "@/layouts/DefaultLayout"
import Card from "@/modules/chat/components/Card"
import SearchInput from "modules/chat/components/SearchInput"
import React, { useState } from "react"
import { NextPageContext } from "next"
import { searchUser } from "modules/user/server"
import { useSearchUsers } from "@/hooks/user"
import ChatBox, { ChatBoxProps } from "@/modules/chat/components/ChatBox"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import Text from "@/components/Typography"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"

type ChatPageProps = {
  user: ChatBoxProps
}

function Chat({ user }: ChatPageProps) {
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState<ChatBoxProps>(
    user || undefined
  )
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
                        changeSelectedUser={(val) => setSelectedUser(val)}
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
        {selectedUser ? (
          <ChatBox name={selectedUser.name} image={selectedUser.image} />
        ) : (
          <Text className="mx-auto mt-32" varaint={TypographyVariant.Body1}>
            Select a chat to start messaging
          </Text>
        )}
      </div>
    </DefaultLayout>
  )
}

export async function getServerSideProps({ query }: NextPageContext) {
  const [user] = await searchUser(query.username!)
  return {
    props: {
      user: changeDateInJSONToMoment(user || null),
      protected: true,
    },
  }
}

export default Chat
