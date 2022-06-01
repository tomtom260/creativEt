import React, { FC, ReactNode } from "react"
import Navigation from "../components/Navigation"
import { NavigationVariant } from "../components/Navigation/nav.enum"

export type DefaultLayoutProps = {
  children: ReactNode
  padded?: boolean
}

function DefaultLayout({ children, padded = true }: DefaultLayoutProps) {
  console.log("second", Date.now())
  return (
    <>
      <Navigation variant={NavigationVariant.SignedIn} />
      <div
        className={`  ${
          padded
            ? "px-2 md:px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 pb-2 pt-12  md:py-24"
            : ""
        } relative  mx-auto`}
      >
        {children}
      </div>
    </>
  )
}

export default DefaultLayout
