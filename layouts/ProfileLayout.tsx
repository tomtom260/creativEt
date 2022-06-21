import React, { ReactNode } from "react"
import DefaultLayout from "@/layouts/DefaultLayout"
import Text from "@/components/Typography"
import { TypographyVariant } from "@/components/Typography/textVariant.enum"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useGetCurrentUser } from "@/hooks/user"
import { getOptimisedProfileImage } from "@/utils/cloudinary"
import { useAppDispatch } from "@/hooks/redux"
import { ModalType, showModal } from "store/modalSlice"
import DeleteAccountModal from "@/modules/user/component/DeleteAccountModal"

function ProfileLayout({ children: Children }: { children: ReactNode }) {
  const SidebarMenuItems = [
    {
      name: "General",
      path: "/account/general",
      label: "General",
      description: "Update your username and manage your account",
    },
    {
      name: "Profile",
      path: "/account/Profile",
      label: "Edit Profile",
      description: "Set up your CreativeET account",
    },
    {
      name: "Password",
      path: "/account/password",
      label: "Password",
      description: "Manage your password",
    },
  ]

  const router = useRouter()
  const { data: user } = useGetCurrentUser()!
  const currentPageDetails = SidebarMenuItems.find(
    (item) => item.path === router.pathname
  )!

  const imageUrl = getOptimisedProfileImage(user?.image!)
  const dispatch = useAppDispatch()

  return (
    <DefaultLayout>
      <div className="flex">
        <div className="relative  w-12 h-12 mr-4">
          <Image
            layout="fill"
            className="rounded-full"
            src={imageUrl}
            alt="profile image"
          />
        </div>
        <div className="flex flex-col">
          <Text varaint={TypographyVariant.H2}>
            {user?.name} / {currentPageDetails.label}
          </Text>
          <Text className=" text-gray-normal" varaint={TypographyVariant.Body1}>
            {currentPageDetails.description}
          </Text>
        </div>
      </div>
      <div className="grid grid-cols-[1fr,3fr] mt-12">
        <div className="">
          {SidebarMenuItems.map((item) => {
            const isActive = router.pathname === item.path
            return (
              <Link key={item.name} href={item.path} passHref>
                <Text
                  varaint={TypographyVariant.Body1}
                  className={`${
                    isActive ? "font-bold " : ""
                  } cursor-pointer capitalize py-1`}
                >
                  {item.name}
                </Text>
              </Link>
            )
          })}
          <div className="w-full h-px bg-gray-light my-5" />
          <Text
            onClick={() => {
              dispatch(
                showModal({
                  modalType: ModalType.DELETE_ACCOUNT,
                  payload: {
                    id: user?.id,
                  },
                })
              )
            }}
            varaint={TypographyVariant.Body1}
            className={` capitalize cursor-pointer text-red-600 font-bold`}
          >
            Deactivate Account
          </Text>
        </div>
        {Children}
      </div>
      <DeleteAccountModal />
    </DefaultLayout>
  )
}

export default ProfileLayout
