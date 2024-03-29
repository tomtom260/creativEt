import React, { Fragment, useContext, useEffect, useState } from "react"
import { Menu, Transition } from "@headlessui/react"
import { BellIcon } from "@heroicons/react/outline"
import Image from "next/image"
import Link from "next/link"
import classNames from "../../utils/classNames"
import BaseNavigation from "./BaseNavigation"
import { useGetCurrentUser } from "@/hooks/user"
import { getOptimisedProfileImage } from "@/utils/cloudinary"
import { signOut } from "next-auth/react"
import NotificationContainer from "@/modules/notification/components/Container"
import { useGetNotifictionsQuery } from "@/modules/notification/hooks"
import { PusherContext } from "@/hooks/pusher"
import { useAppDispatch } from "@/hooks/redux"
import { addToast } from "store/toastSlice"
import { Notification, UserRole } from "@prisma/client"
import { useQueryClient } from "react-query"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { TGetNotifcation } from "@/modules/notification/types"
import ImageWithSkeleton from "../ImageWithSkeleton"
import NotifcationCard, {
  selectMessage,
} from "@/modules/notification/components/NotificationCard"
import Text from "../Typography"
import { TypographyVariant } from "../Typography/textVariant.enum"
import { LangContext } from "@/hooks/Lang"

function SignedInNavigation() {
  const { data: user } = useGetCurrentUser()
  const notifications = useGetNotifictionsQuery().map(
    (notifQuery) => notifQuery.data!
  )
  const pusherClient = useContext(PusherContext)
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    const notificationsChannel = pusherClient.subscribe(
      `notifications-${user.id}`
    )
    notificationsChannel.bind(
      "notification:new",
      (notification: TGetNotifcation) => {
        queryClient.setQueryData(
          "notifications",
          [notification].concat(queryClient.getQueryData("notifications") || [])
        )
        toast(<NotifcationCard isToast notification={notification} />)

        // dispatch(addToast(notification))
      }
    )
  }, [])
  const { lang, setLang, selectedLang } = useContext(LangContext)

  const userNavigation = [
    { name: lang.profile, href: `/${user?.username}`, onClick: () => {} },
    { name: lang.dashboard, href: "/account/dashboard", onClick: () => {} },
    { name: lang.jobs, href: "/account/jobs", onClick: () => {} },
    { name: lang.chat, href: "/chat", onClick: () => {} },
    { name: lang.wallet, href: "/account/wallet", onClick: () => {} },
    {
      name: lang.signout,
      href: "#",
      onClick: () => {
        router.push("/auth/signin")
        signOut()
      },
    },
  ]
  const [showNotification, setShowNotification] = useState(false)

  const imageUrl = getOptimisedProfileImage(user?.image!)

  return (
    <>
      <BaseNavigation
        userNavigation={userNavigation}
        MobileNavigationRightSide={() => (
          <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
            <div className="flex-shrink-0">
              <Image
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
                src={imageUrl}
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">
                {user.name}
              </div>
              <div className="text-sm font-medium text-gray-500">
                {user.email}
              </div>
            </div>
            <button
              type="button"
              className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">{lang.viewNotification}</span>
              <div className="flex gap-3 items-center">
                <Text
                  className="text-gray-400 cursor-pointer"
                  onClick={() =>
                    selectedLang === "AM" ? setLang("EN") : setLang("AM")
                  }
                  varaint={TypographyVariant.Body1}
                >
                  {selectedLang}
                </Text>
                {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
              </div>
            </button>
          </div>
        )}
        NavigationRightSide={() => (
          <div className="hidden  lg:flex w-min  lg:items-center justify-self-end lg:justify-end xl:col-span-3">
            <Text
              className="text-gray-400 cursor-pointer"
              onClick={() =>
                selectedLang === "AM" ? setLang("EN") : setLang("AM")
              }
              varaint={TypographyVariant.Body1}
            >
              {selectedLang}
            </Text>
            <div className="relative">
              <div
                onClick={() => setShowNotification((val) => !val)}
                className="ml-5 cursor-pointer flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                {notifications?.filter((not) => !not.seen).length ? (
                  <div className="absolute  top-0 text-xs flex items-center justify-center right-px px-px min-w-[16px] h-4 rounded-full bg-secondary-normal text-white">
                    <p className="!m-0 !p-0">
                      {notifications?.filter((not) => !not.seen).length}
                    </p>
                  </div>
                ) : null}
              </div>
              <Transition
                enter="transition-opacity transition-transform duration-1000"
                enterFrom="opacity-0 "
                enterTo="opacity-100"
                leave="transition-opacity duration-1000"
                leaveFrom="opacity-1000"
                leaveTo="opacity-10"
                show={showNotification}
              >
                <NotificationContainer />
              </Transition>
            </div>
            {/* Profile dropdown */}
            <Menu as="div" className="flex-shrink-0 relative ml-5">
              <div>
                <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Image
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                    src={imageUrl}
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                  {user.role === UserRole.MODERATOR && (
                    <Link passHref href="/moderator">
                      <a
                        className={classNames(
                          "block py-2 px-4 text-sm text-gray-700"
                        )}
                      >
                        {lang.moderator}
                      </a>
                    </Link>
                  )}
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link passHref href={item.href}>
                          <a
                            onClick={item.onClick}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block py-2 px-4 text-sm text-gray-700"
                            )}
                          >
                            {item.name}
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
            <Link passHref href="/upload">
              <span className="ml-6 inline-flex cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {lang.upload}
              </span>
            </Link>
          </div>
        )}
      />
    </>
  )
}

export default SignedInNavigation
