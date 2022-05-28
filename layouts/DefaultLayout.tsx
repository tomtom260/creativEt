import React, { FC, ReactNode } from "react"
import Navigation from "../components/Navigation"
import { NavigationVariant } from "../components/Navigation/nav.enum"

export type DefaultLayoutProps = {
  children: ReactNode
  padded?: boolean
}

function DefaultLayout({ children, padded = true }: DefaultLayoutProps) {
  return (
    <>
      <Navigation variant={NavigationVariant.SignedIn} />
      <div
        className={`  ${
          padded
            ? "max-w-7xl px-2  sm:px-6  md:px-4 lg:px-8 pb-2 pt-12  md:py-8"
            : ""
        } relative  mx-auto`}
      >
        {children}
      </div>
    </>
  )
}

export default DefaultLayout
