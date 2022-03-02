import React from "react"
import SignedInNavigation from "./SignedIn"
import SignedOutNavigation from "./SignedOut"
import { NavigationVariant } from "./nav.enum"

export type NavigationProps = {
  /**
   * Type of Navigation can be Signed In Or Not
   * 0 or 1
   *
   *
   * !! using the Navigation VariantEnum is preferable
   */
  variant: NavigationVariant
}

function Navigation({ variant }: NavigationProps) {
  return variant === NavigationVariant.SignedIn ? (
    <SignedInNavigation />
  ) : (
    <SignedOutNavigation />
  )
}

export default Navigation
