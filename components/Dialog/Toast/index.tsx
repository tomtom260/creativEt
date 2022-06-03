import React, { useEffect, useState } from "react"
import NotificationCard from "@/modules/notification/components/NotificationCard"
import { useGetNotifictionsQuery } from "@/modules/notification/hooks"
import { Transition } from "@headlessui/react"
import { Notification } from "@prisma/client"
import { useAppDispatch } from "@/hooks/redux"
import { removeToast } from "store/toastSlice"

function Toast() {
  const notification = useGetNotifictionsQuery()[0].data
  const [isShown, setIsShown] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setTimeout(() => {
      setIsShown(false)
      dispatch(removeToast({ id: notification?.id as string }))
    }, 10000)
  }, [])

  return (
    <>
      <Transition show={isShown} appear unmount={false}>
        <Transition.Child
          enter="transition-opacity transition-transform duration-300 ease-out "
          enterFrom="opacity-0 translate-x-[600px] "
          enterTo="opacity-100 translate-x-0"
          leave="transition-opacity transition-transform duration-500 ease-in"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-10 -translate-y-[200px]"
          className="shadow-2xl rounded-2xl overflow-hidden"
        >
          <NotificationCard notification={notification as Notification} />
        </Transition.Child>
      </Transition>
    </>
  )
}

export default Toast
