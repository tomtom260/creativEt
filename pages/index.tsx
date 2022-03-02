import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import BaseNavigation from "../components/Navigation/BaseNavigation"

export default function Component() {
  const { status, data } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return "Loading"
  }
  console.log(status)

  if (status === "unauthenticated") {
    router.push("/auth/signin")
  }

  return (
    <>
      <BaseNavigation
        user={{
          name: "Thomas",
          email: "thomas@gmal.com",
        }}
      />
      Signed in as {data?.user?.email} <br />
      <button className="bg-red-700 w-[500px]" onClick={() => signOut()}>
        Sign out
      </button>
    </>
  )
}
