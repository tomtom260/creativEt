import DefaultLayout from "@/layouts/DefaultLayout"
import Card from "@/modules/chat/components/Card"
import SearchInput from "modules/chat/components/SearchInput"
import React, { useContext, useEffect, useState } from "react"
import { NextPageContext } from "next"
import { searchUser } from "modules/user/server"
import { useGetCurrentUser, useSearchUsers } from "@/hooks/user"
import ChatBox, { ChatBoxProps } from "@/modules/chat/components/ChatBox"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import Text from "@/components/Typography"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import { getAllRooms } from "@/modules/chat/server/controller"
import { getSession } from "next-auth/react"
import { useQueryClient } from "react-query"
import { PusherContext } from "@/hooks/pusher"
import { Room } from "@prisma/client"
import { useRouter } from "next/router"

type ChatPageProps = {
  user: ChatBoxProps
  rooms: Room[]
}

function Chat({ user, rooms }: ChatPageProps) {
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState<ChatBoxProps>(user)
  const searchUserQuery = useSearchUsers(search, rooms)
  const { id } = useGetCurrentUser().data
  const pusherClient = useContext(PusherContext)
  const queryClient = useQueryClient()
  const router = useRouter()

  useEffect(() => {
    rooms.map(({ id }) => {
      const channel = pusherClient.subscribe(`presence-room-${id}`)
      channel.bind("message:new", function (message) {
        console.log("message", message)
        const room = queryClient.getQueryData(["room", id])
        queryClient.setQueryData(["room", id], [...room, message])
      })
      channel.bind("member:status", (member) => alert(JSON.stringify(member)))
    })
  }, [])

  return (
    <DefaultLayout>
      <div className="flex flex-1">
        <div
          className={`${
            router.query.username ? "hidden" : ""
          } md:flex w-full md:w-auto flex-col md:gap-y-4`}
        >
          <div className="flex gap-x-10 py-2 bg-slate-100 px-2">
            <div className="">
              <SearchInput
                label=""
                value={search}
                onChange={(val) => setSearch(val)}
              />
            </div>
          </div>
          <div className="flex gap-x-6">
            <div className="flex-shrink-0  w-full min-w-[280px]  flex-col  px-2 ">
              <div className=" divide-y-2  rounded-xl overflow-hidden ">
                {search &&
                  (searchUserQuery?.data || []).map((user, index) => {
                    return (
                      <Card
                        changeSelectedUser={(val) => setSelectedUser(val)}
                        key={user.id}
                        username={user.username}
                        name={user.name}
                        searchString={search}
                        image={user.image}
                        id={user.id}
                      />
                    )
                  })}
                {!search &&
                  rooms
                    .map((room) => {
                      const [{ Profile, ...user }] = room.members.filter(
                        (user) => user.id !== id
                      )
                      user.username = Profile.username
                      return { id: room.id, user }
                    })
                    .map(({ user, id }) => {
                      return (
                        <Card
                          id={user.id}
                          roomId={id}
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
        <div
          className={`${
            !router.query.username && "hidden"
          } md:flex items-center justify-center flex-1`}
        >
          {selectedUser ? (
            <ChatBox
              id={selectedUser.id}
              name={selectedUser.name}
              image={selectedUser.image}
              roomId={selectedUser.roomId}
            />
          ) : (
            <Text className="mx-auto mt-32" varaint={TypographyVariant.Body1}>
              Select a chat to start messaging
            </Text>
          )}
        </div>
      </div>
    </DefaultLayout>
  )
}

export async function getServerSideProps({ query, req }: NextPageContext) {
  const session = await getSession({ req })
  const [{ image, name, id }] = await searchUser(query.username!)
  const rooms = await getAllRooms(session?.user.id)
  const room = rooms.find((room) =>
    room.members.find((mem) => mem.Profile?.username === query.username)
  )
  return {
    props: changeDateInJSONToMoment({
      user: room ? { name, id, image, roomId: room.id } : null,
      rooms,
      protected: true,
    }),
  }
}

export default Chat
