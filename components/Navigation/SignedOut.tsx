import React from "react"
import BaseNavigation from "./BaseNavigation"

function SignedOutNavigation() {
  const userNavigation = [
    { name: "SignIn", href: "#" },
    { name: "SignUp", href: "#" },
  ]

  return (
    <>
      <BaseNavigation
        userNavigation={userNavigation}
        NavigationRightSide={() => (
          <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
            {userNavigation.map(userNav => (
              <a
                key={userNav.name}
                href={userNav.href}
                className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {userNav.name}
              </a>
            ))}
          </div>
        )}
      />
    </>
  )
}

export default SignedOutNavigation
