import DefaultLayout from "@/layouts/DefaultLayout"
import Card from "@/modules/chat/components/Card"
import SearchInput from "modules/chat/components/SearchInput"
import React, { useContext, useEffect, useRef, useState } from "react"
import { NextPageContext } from "next"
import { searchUser } from "modules/user/server"
import { useGetCurrentUser, useSearchUsers } from "@/hooks/user"
import ChatBox, {
  ChatBoxProps,
  TTypingUser,
} from "@/modules/chat/components/ChatBox"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import Text from "@/components/Typography"
import { changeDateInJSONToMoment } from "@/utils/changeDateToMoment"
import { getAllRooms } from "@/modules/chat/server/controller"
import { getSession } from "next-auth/react"
import { Room } from "@prisma/client"
import { useRouter } from "next/router"
import { createRoom } from "@/modules/chat/server/services"
import { useGetAllRoomsQuery } from "@/modules/chat/hooks"
import moment from "moment"

type ChatPageProps = {
  user: ChatBoxProps
  rooms: Room[]
}

function Chat({ user, rooms }: ChatPageProps) {
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState<ChatBoxProps>(user)
  const roomsQuery = useGetAllRoomsQuery(rooms)
  const searchUserQuery = useSearchUsers(search, roomsQuery.data || [])
  const { id: currentUserId } = useGetCurrentUser().data!
  const router = useRouter()

  return (
    <DefaultLayout>
      <div className="flex flex-1 md:-my-9">
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
                  (roomsQuery.data || [])
                    .sort((a, b) =>
                      moment(a.Message[0].createdAt).isBefore(
                        moment(b.Message[0].createdAt)
                      )
                        ? 1
                        : -1
                    )
                    .map((room) => {
                      const [{ Profile, ...user }] = room.members.filter(
                        (user) => user.id !== currentUserId
                      )
                      user.username = Profile.username
                      return { id: room.id, user, message: room.Message[0] }
                    })
                    .map(({ user, id, message }) => {
                      return (
                        message && (
                          <Card
                            message={message}
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
  const rooms = await getAllRooms(session?.user.id)
  let user

  if (query.username) {
    const [{ image, name, id }] = await searchUser(query.username as string)
    const room = rooms.find((room) =>
      room.members.find((mem) => mem.Profile?.username === query.username)
    )
    user = { name, id, image, roomId: room?.id }

    if (!user.roomId) {
      user.roomId = (await createRoom([session?.user.id, id])).id
      rooms.push(user)
    }
  }
  return {
    props: changeDateInJSONToMoment({
      user,
      rooms,
      protected: true,
    }),
  }
}

export default Chat
