import { useSession } from "next-auth/react"
import React, { FC, ReactNode } from "react"
import Navigation from "../components/Navigation"
import { NavigationVariant } from "../components/Navigation/nav.enum"
import Skeleton from "../components/Skeleton"

export type DefaultLayoutProps = {
  children: ReactNode
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Navigation variant={NavigationVariant.SignedIn} />
      <div className="px-4 sm:px-6 lg:px-8 py-7 md:py-16  overflow-hidden">
        {children}
      </div>
    </>
  )
}

export default DefaultLayout
