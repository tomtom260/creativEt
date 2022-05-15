import React from "react"
import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { BellIcon } from "@heroicons/react/outline"
import Image from "next/image"
import Link from "next/link"
import classNames from "../../utils/classNames"
import BaseNavigation from "./BaseNavigation"
import { useGetCurrentUser } from "@/hooks/user"
import { getOptimisedProfileImage } from "@/utils/cloudinary"
import { signOut } from "next-auth/react"

function SignedInNavigation() {
  const { data: user } = useGetCurrentUser()
  const userNavigation = [
    { name: "Your Profile", href: `/${user?.username}`, onClick: () => {} },
    { name: "Settings", href: "#", onClick: () => {} },
    {
      name: "Sign out",
      href: "#",
      onClick: () => signOut(),
    },
  ]

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
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        )}
        NavigationRightSide={() => (
          <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
            <a
              href="#"
              className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </a>
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
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <a
                          onClick={item.onClick}
                          href={item.href}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block py-2 px-4 text-sm text-gray-700"
                          )}
                        >
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
            <Link passHref href="/upload">
              <span className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Upload
              </span>
            </Link>
          </div>
        )}
      />
    </>
  )
}

export default SignedInNavigation
