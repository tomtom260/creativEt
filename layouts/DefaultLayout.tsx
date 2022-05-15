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
      <div className="px-2 md:px-4  relative max-w-7xl mx-auto sm:px-6 lg:px-8 pb-2 pt-12 md:pt-0 md:pb-0 md:py-16  overflow-hidden">
        {children}
      </div>
    </>
  )
}

export default DefaultLayout
