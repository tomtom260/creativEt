import React, { FC } from "react"
import { Popover } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import Image from "next/image"
import Link from "next/link"
import classNames from "../../utils/classNames"
import Text from "../Typography"
import { TypographyVariant } from "../Typography/textVariant.enum"

export type BaseNavigationProps = {
  NavigationRightSide: FC
  MobileNavigationRightSide?: FC
  userNavigation: { name: string; href: string; onClick: () => void }[]
}

function BaseNavigation({
  NavigationRightSide,
  MobileNavigationRightSide,
  userNavigation,
}: BaseNavigationProps) {
  const navigation = [
    { name: "Marketplace", href: "/", current: true },
    { name: "Hire Creators", href: "#", current: false },
  ]

  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "inset-0  z-50 overflow-y-auto" : "",
            "bg-white  w-full shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <div className="bg-white fixed z-50 w-full">
            <div className="max-w-7xl      w-full bg-white mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-4">
                  <div className="flex-shrink-0 flex items-center">
                    <Link passHref href={"/"}>
                      <div className="relative w-16 h-8 md:w-[83px] md:h-[40px]">
                        <Image
                          src="/assets/images/logo.png"
                          alt="logo"
                          layout="fill"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0  -ml-20 xl:col-span-5">
                  <div className="flex flex-1 items-center  px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div className="w-full flex flex-1 justify-center">
                      <div className=" hidden lg:flex items-center  w-3/5 max-w[400px] justify-between">
                        {navigation.map((item) => (
                          <Link key={item.name} href={item.href} passHref>
                            <Text
                              className="!text-lg whitespace-nowrap cursor-pointer tracking-widest"
                              varaint={TypographyVariant.H2}
                            >
                              {item.name}
                            </Text>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2  rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
                <NavigationRightSide />
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "hover:bg-gray-50",
                      "block rounded-md py-2 px-3 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 pb-3">
                {MobileNavigationRightSide && <MobileNavigationRightSide />}
                <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                  {userNavigation.map((item) => (
                    <a
                      onClick={item.onClick}
                      key={item.name}
                      href={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </div>
        )}
      </Popover>
    </>
  )
}

export default BaseNavigation
